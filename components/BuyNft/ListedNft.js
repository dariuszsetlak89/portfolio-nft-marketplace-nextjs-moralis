import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Card, useNotification } from "@web3uikit/core";
import { ethers } from "ethers";
import Image from "next/image";
import nftMarketplaceAbi from "../../constants/NftMarketplace.json";
import nftAbi from "../../constants/CuteNft.json";
import UpdateListingModal from "./UpdateListingModal";

export default function ListedNft({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled, account } = useMoralis();

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [imageURI, setImageURI] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const hideModal = () => setShowModal(false);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////
    // useEffect Hook //
    ////////////////////
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Function: buyItem
    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    });

    // Function: getTokenURI
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    });

    //////////////////
    // UI Functions //
    //////////////////

    // UpdateUI function
    async function updateUI() {
        // Get tokenURI
        const tokenURI = await getTokenURI();
        console.log(`The TokenURI is ${tokenURI}`);
        // Get the image using the image tag from the tokenURI
        if (tokenURI) {
            // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            const tokenURIResponse = await (await fetch(requestURL)).json();
            const imageURI = tokenURIResponse.image;
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            setImageURI(imageURIURL);
            setTokenName(tokenURIResponse.name);
            setTokenDescription(tokenURIResponse.description);
        }
    }

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    const isOwnedByUser = seller === account || seller === undefined;
    const cuttedSellerAddress = isOwnedByUser ? "you" : addressCutter(seller || "", 15);

    // Handle card click function
    const handleCardClick = () => {
        isOwnedByUser
            ? setShowModal(true)
            : buyItem({
                  onError: (error) => console.log(error),
                  onSuccess: handleBuyItemSuccess,
              });
    };

    // Handle success function
    const handleBuyItemSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "NFT item bought!",
            title: "NFT Item Bought",
            position: "bottomL",
        });
    };

    //////////////////////
    // Helper Functions //
    //////////////////////

    // Address cutter function
    const addressCutter = (fullAddress, shortAddressLength) => {
        if (fullAddress.length <= shortAddressLength) return fullAddress;
        const separator = "...";
        const frontChars = fullAddress.substring(0, 6);
        const backChars = fullAddress.substring(fullAddress.length - 4);
        return frontChars + separator + backChars;
    };

    return (
        <div>
            {imageURI ? (
                <div>
                    <UpdateListingModal
                        isVisible={showModal}
                        tokenId={tokenId}
                        marketplaceAddress={marketplaceAddress}
                        nftAddress={nftAddress}
                        onClose={hideModal}
                    />
                    <Card
                        title={tokenName}
                        description={tokenDescription}
                        onClick={handleCardClick}
                    >
                        <div className="p-2">
                            <div className="flex flex-col items-end gap-2">
                                <div>#{tokenId}</div>
                                <div className="italic text-sm">Owned by {cuttedSellerAddress}</div>
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    height="200"
                                    width="200"
                                />
                                <div className="font-bold">
                                    {ethers.utils.formatUnits(price, "ether")} ETH
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
