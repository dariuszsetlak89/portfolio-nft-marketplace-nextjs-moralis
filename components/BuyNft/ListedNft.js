import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Card, useNotification } from "@web3uikit/core";
import { ethers } from "ethers";
import Image from "next/image";
import nftAbi from "../../constants/CuteNft.json";
import UpdateModal from "./Modals/UpdateModal";
import BuyNftModal from "./Modals/BuyNftModal";

export default function ListedNft({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, account } = useMoralis();

    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [imageURI, setImageURI] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const hideUpdateModal = () => setShowUpdateModal(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const hideBuyModal = () => setShowBuyModal(false);

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

    // Function: getTokenURI
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            _tokenId: tokenId,
        },
    });

    //////////////////
    // UI Functions //
    //////////////////

    // UpdateUI function - download tokenURI data for single NFT item
    async function updateUI() {
        // Get tokenURI
        const tokenURI = await getTokenURI();
        // console.log(`The TokenURI is ${tokenURI}`);
        // Get the image using the image tag from the tokenURI
        if (tokenURI) {
            // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
            const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            // console.log("requestURL:", requestURL);
            const tokenURIResponse = await (await fetch(requestURL)).json();
            // console.log("tokenURIResponse:", tokenURIResponse);
            const imageURI = tokenURIResponse.image;
            // console.log("imageURI:", imageURI);
            const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            // console.log("imageURIURL:", imageURIURL);
            setImageURI(imageURIURL);
            setTokenName(tokenURIResponse.name);
            setTokenDescription(tokenURIResponse.description);
        }
    }

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

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    const isOwnedByUser = seller === account || seller === undefined;
    const cuttedSellerAddress = isOwnedByUser ? "You" : addressCutter(seller || "", 15);

    // Handle card click function
    const handleCardClick = () => {
        isOwnedByUser ? setShowUpdateModal(true) : setShowBuyModal(true);
    };

    return (
        <div>
            {imageURI ? (
                <div>
                    <UpdateModal
                        isVisible={showUpdateModal}
                        tokenId={tokenId}
                        marketplaceAddress={marketplaceAddress}
                        nftAddress={nftAddress}
                        onClose={hideUpdateModal}
                    />
                    <BuyNftModal
                        isVisible={showBuyModal}
                        tokenId={tokenId}
                        marketplaceAddress={marketplaceAddress}
                        nftAddress={nftAddress}
                        price={price}
                        onClose={hideBuyModal}
                    />
                    <Card title={tokenName} description={tokenDescription} onClick={handleCardClick}>
                        <div className="p-3">
                            <div className="flex flex-col gap-3 items-start">
                                <div className={isOwnedByUser ? "text-green-500" : "text-blue-500"}>
                                    <div className="text-xl font-bold">#{tokenId}</div>
                                    <div className="italic text-sm">
                                        Owned by <span className="font-bold">{cuttedSellerAddress}</span>
                                    </div>
                                </div>
                                <div className="container flex justify-center">
                                    <Image
                                        loader={() => imageURI}
                                        src={imageURI}
                                        alt="Listed NFT item"
                                        height={200}
                                        width={200}
                                        priority="true"
                                        unoptimized
                                        className="h-48 w-auto"
                                    />
                                </div>
                                <div className="font-bold">Price: {ethers.utils.formatUnits(price, "ether")} ETH</div>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="text-xl text-bold">Loading...</div>
            )}
        </div>
    );
}
