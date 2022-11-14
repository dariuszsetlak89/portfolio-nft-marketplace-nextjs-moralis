import { Form, useNotification, Button } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractAddresses from "../../constants/contractAddresses.json";
import nftMarketplaceAbi from "../../constants/NftMarketplace.json";
import nftAbi from "../../constants/CuteNft.json";

export default function Home() {
    const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis();

    ///////////////////////////
    // Read contract address //
    ///////////////////////////

    // Read connected network ID and contract address of connected network from `contractAddresses` file
    const chainId = parseInt(chainIdHex);
    const marketplaceAddress = chainId in contractAddresses ? contractAddresses[chainId]["NftMarketplace"][0] : null;

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [proceeds, setProceeds] = useState("0");

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        if (isWeb3Enabled) {
            setupUI();
        }
    }, [proceeds, account, isWeb3Enabled, chainId]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////
    const { runContractFunction } = useWeb3Contract();

    // Approval and listing
    async function approveAndList(data) {
        console.log("Approving...");
        const nftAddress = data.data[0].inputResult;
        const tokenId = data.data[1].inputResult;
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString();
        console.log("price:", price);

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        };

        // Run contract function: Approve NFT Marketplace for listing NFT item
        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
            onError: (error) => {
                console.log(error);
            },
        });
    }

    // Function handle approve success
    async function handleApproveSuccess(nftAddress, tokenId, price) {
        console.log("Let's list NFT item!");
        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        };

        // Run contract function: List NFT item
        await runContractFunction({
            params: listOptions,
            onSuccess: handleListSuccess,
            onError: (error) => console.log(error),
        });
    }

    // Function handle list NFT item success
    async function handleListSuccess(tx) {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "NFT listing",
            title: "NFT item listed!",
            position: "bottomL",
        });
    }

    // Function handle proceeds withdrawal success
    const handleWithdrawSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "Proceeds withdrawn!",
            position: "bottomL",
        });
    };

    //////////////////
    // UI Functions //
    //////////////////

    // Function setupUI
    async function setupUI() {
        const returnedProceeds = await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        });
        // Update proceeds state variable to show in UI
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString());
        }
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="m-5 text-3xl font-bold text-green-600 text-center">Sell your NFT item</h1>
            <div className="mx-5 mt-5 mb-10 text-xl font-medium text-center">
                <div className="mx-20">
                    Fulfill the form with your owned NFT item data, which you want to list and simply list it on the
                    Marketplace!
                </div>
            </div>
            <div className="mx-20 px-20 bg-lime-300 text-center flex flex-col">
                <Form
                    onSubmit={approveAndList}
                    customFooter={
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button size="large" text="Confirm" theme="primary" type="submit" />
                        </div>
                    }
                    data={[
                        {
                            name: "NFT Address",
                            type: "text",
                            inputWidth: "100%",
                            value: "",
                            key: "nftAddress",
                        },
                        {
                            name: "Token ID",
                            type: "number",
                            inputWidth: "50%",
                            value: "",
                            key: "tokenId",
                        },
                        {
                            name: "Price (in ETH)",
                            type: "number",
                            inputWidth: "50%",
                            value: "",
                            key: "price",
                        },
                    ]}
                    title="Sell NFT form"
                    id="Main Form"
                    theme="primary"
                    buttonConfig={{
                        theme: "primary",
                    }}
                />
                <div className="my-10">
                    <div className="mx-5 text-xl font-medium">
                        Withdraw proceeds: {ethers.utils.formatEther(proceeds)} ETH
                    </div>
                    {proceeds != "0" ? (
                        <Button
                            onClick={() => {
                                // Run contract function: withdrawProceeds
                                runContractFunction({
                                    params: {
                                        abi: nftMarketplaceAbi,
                                        contractAddress: marketplaceAddress,
                                        functionName: "withdrawProceeds",
                                        params: {},
                                    },
                                    onError: (error) => console.log(error),
                                    onSuccess: handleWithdrawSuccess,
                                });
                            }}
                            text="Withdraw"
                            type="button"
                            theme="colored"
                            color="green"
                        />
                    ) : (
                        <div className="mx-5 mt-5 mb-10 text-lg">No proceeds for withdrawal detected!</div>
                    )}
                </div>
            </div>
        </div>
    );
}
