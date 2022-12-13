import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { Card } from "@web3uikit/core";
import { ethers } from "ethers";
import { nftAbi } from "../../constants";
import Image from "next/image";
import OwnerModal from "./Modals/OwnerModal";
import BuyerModal from "./Modals/BuyerModal";

export default function ListedNft({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled, account } = useMoralis();

    const [imageURI, setImageURI] = useState("");
    const [tokenName, setTokenName] = useState("");
    const [tokenDescription, setTokenDescription] = useState("");
    const [showOwnerModal, setShowOwnerModal] = useState(false);
    const hideOwnerModal = () => setShowOwnerModal(false);
    const [showBuyerModal, setShowBuyerModal] = useState(false);
    const hideBuyerModal = () => setShowBuyerModal(false);

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    // Contract function: getTokenURI
    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            _tokenId: tokenId,
        },
    });

    // UpdateUI function - download tokenURI data for single NFT item
    async function updateUI() {
        // Get tokenURI
        const tokenURI = await getTokenURI();
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

    // Address cutter function
    const addressCutter = (fullAddress, shortAddressLength) => {
        if (fullAddress.length <= shortAddressLength) return fullAddress;
        const separator = "...";
        const frontChars = fullAddress.substring(0, 6);
        const backChars = fullAddress.substring(fullAddress.length - 4);
        return frontChars + separator + backChars;
    };

    const isOwnedByUser = seller === account || seller === undefined;
    const cuttedSellerAddress = isOwnedByUser ? "You" : addressCutter(seller || "", 15);

    // Handle card click function
    const handleCardClick = () => {
        isOwnedByUser ? setShowOwnerModal(true) : setShowBuyerModal(true);
    };

    return (
        <div>
            {imageURI ? (
                <div>
                    <OwnerModal
                        isVisible={showOwnerModal}
                        marketplaceAddress={marketplaceAddress}
                        nftAddress={nftAddress}
                        tokenId={tokenId}
                        imageURI={imageURI}
                        tokenName={tokenName}
                        tokenDescription={tokenDescription}
                        price={price}
                        cuttedSellerAddress={cuttedSellerAddress}
                        onClose={hideOwnerModal}
                    />
                    <BuyerModal
                        isVisible={showBuyerModal}
                        marketplaceAddress={marketplaceAddress}
                        nftAddress={nftAddress}
                        tokenId={tokenId}
                        imageURI={imageURI}
                        tokenName={tokenName}
                        tokenDescription={tokenDescription}
                        price={price}
                        cuttedSellerAddress={cuttedSellerAddress}
                        onClose={hideBuyerModal}
                    />
                    <Card title={tokenName} description={tokenDescription} onClick={handleCardClick}>
                        <div className="nftCard">
                            <div className={isOwnedByUser ? "text-green-500" : "text-blue-500"}>
                                <div className="text-xl font-bold">#{tokenId}</div>
                                <div className="italic text-sm">
                                    Owned by <span className="font-bold">{cuttedSellerAddress}</span>
                                </div>
                            </div>
                            <div className="nftCardImage">
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    alt="Listed NFT item"
                                    height={200}
                                    width={200}
                                    priority="true"
                                    unoptimized
                                />
                            </div>
                            <div className="font-bold">Price: {ethers.utils.formatUnits(price, "ether")} ETH</div>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className="nftCardLoadingItem">Loading item...</div>
            )}
        </div>
    );
}
