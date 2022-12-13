import { useState } from "react";
import { Modal, Card } from "@web3uikit/core";
import { ethers } from "ethers";
import Image from "next/image";
import PriceModal from "./PriceModal";
import CancelModal from "./CancelModal";

export default function OwnerModal({
    isVisible,
    marketplaceAddress,
    nftAddress,
    tokenId,
    imageURI,
    tokenName,
    tokenDescription,
    price,
    cuttedSellerAddress,
    onClose,
}) {
    const [showPriceModal, setShowPriceModal] = useState(false);
    const hidePriceModal = () => setShowPriceModal(false);
    const [showCancelModal, setshowCancelModal] = useState(false);
    const hideCancelModal = () => setshowCancelModal(false);

    // Handle update listing success function
    const handlePriceUpdateButton = async () => {
        setShowPriceModal(true);
        onClose();
    };

    // Handle update listing success function
    const handleCancelListingButton = async () => {
        setshowCancelModal(true);
        onClose();
    };

    return (
        <div>
            {/* Owner modal */}
            <Modal
                title={<div className="ownerModalTitle">Update NFT listing price or cancel listing</div>}
                isVisible={isVisible}
                width="800px"
                onCloseButtonPressed={onClose}
                customFooter={<p>Update NFT item listing price or cancel listing</p>}
            >
                <div>
                    <div className="mx-52">
                        <Card title={tokenName} description={tokenDescription}>
                            <div className="ownerModalNftCard">
                                <div>
                                    <div className="text-2xl font-bold">#{tokenId}</div>
                                    <div className="italic">
                                        Owned by <span className="font-bold">{cuttedSellerAddress}</span>
                                    </div>
                                </div>
                                <div className="ownerModalNftCardImage">
                                    <Image
                                        loader={() => imageURI}
                                        src={imageURI}
                                        alt="Listed NFT item"
                                        height={200}
                                        width={225}
                                        priority="true"
                                        unoptimized
                                    />
                                </div>
                                <div className="font-bold">Price: {ethers.utils.formatUnits(price, "ether")} ETH</div>
                            </div>
                        </Card>
                    </div>
                    <div>
                        <div className="ownerModalDescription">
                            <p>Do you want to update listing price or cancel listing?</p>
                        </div>
                        <div className="ownerModalButtons">
                            <div className="mx-5">
                                <button className="myButtonGreen" onClick={handlePriceUpdateButton}>
                                    Update price
                                </button>
                            </div>
                            <div className="mx-5">
                                <button className="myButtonRed" onClick={handleCancelListingButton}>
                                    Cancel listing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <PriceModal
                isVisible={showPriceModal}
                tokenId={tokenId}
                marketplaceAddress={marketplaceAddress}
                nftAddress={nftAddress}
                onClose={hidePriceModal}
            />
            <CancelModal
                isVisible={showCancelModal}
                tokenId={tokenId}
                marketplaceAddress={marketplaceAddress}
                nftAddress={nftAddress}
                onClose={hideCancelModal}
            />
        </div>
    );
}
