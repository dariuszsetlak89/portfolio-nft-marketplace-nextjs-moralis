import { Form, useNotification, Button } from "@web3uikit/core";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { contractAddresses, nftMarketplaceAbi, nftAbi } from "../../constants";
import { Tooltip } from "@web3uikit/core";
import Image from "next/image";
import ReactTooltip from "react-tooltip";

const supportedChainsIds = ["31337", "5"];

export default function Home() {
    const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis();

    const router = useRouter();

    const chainId = parseInt(chainIdHex);
    const marketplaceAddress = chainId in contractAddresses ? contractAddresses[chainId]["NftMarketplace"][0] : null;

    const [proceeds, setProceeds] = useState("0");

    const dispatch = useNotification();

    useEffect(() => {
        if (isWeb3Enabled) {
            setupUI();
        }
    }, [proceeds, account, isWeb3Enabled, chainId]);

    const { runContractFunction } = useWeb3Contract();

    // Approval and listing
    async function approveAndList(data) {
        const nftAddress = data.data[0].inputResult;
        const tokenId = data.data[1].inputResult;
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString();

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
            message: "NFT item listed.",
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
        <div className="buyNftIndex">
            {isWeb3Enabled ? (
                <div>
                    {supportedChainsIds.includes(chainId.toString()) ? (
                        <div>
                            <h1 className="sellNftTitle">Sell your NFT item</h1>
                            <div className="sellNftDescription">
                                <p>Want to list NFT? Just fill the form and click confirm button. Simple like this!</p>
                                <p>
                                    Have you sold your NFT? Congrats! Now push withdraw button below to withdraw your
                                    proceeds.
                                </p>
                            </div>
                            {/* Refresh button */}
                            <div className="m-10 flex justify-center">
                                <div className="refreshButton" data-tip="Refresh page">
                                    <ReactTooltip place="right" type="success" effect="solid" />
                                    <Image
                                        src="/images/refresh.png"
                                        alt="Refresh button"
                                        width={32}
                                        height={32}
                                        onClick={() => router.reload()}
                                        className="hover:animate-spin"
                                    />
                                </div>
                            </div>
                            {/* Sell NFT form */}
                            <div className="sellNftForm">
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
                                            inputWidth: "75%",
                                            value: "",
                                            key: "tokenId",
                                        },
                                        {
                                            name: "Price (in ETH)",
                                            type: "number",
                                            inputWidth: "75%",
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
                                {/* Withdraw proceeds */}
                                <div className="my-10">
                                    <div className="sellNftWithdrawProceeds">
                                        Withdraw proceeds:{" "}
                                        <span className="font-bold">{ethers.utils.formatEther(proceeds)} ETH</span>
                                    </div>
                                    {proceeds != "0" ? (
                                        <div>
                                            <button
                                                className="myButtonLime"
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
                                            >
                                                Withdraw
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="sellNftNoProceeds">No proceeds for withdrawal detected!</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h1 className="connectionProblem">Not supported chain!</h1>
                    )}
                </div>
            ) : (
                <h1 className="connectionProblem">Web3 wallet not connected!</h1>
            )}
        </div>
    );
}
