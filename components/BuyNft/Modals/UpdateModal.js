import { useState } from "react";
import { Modal } from "@web3uikit/core";
import PriceModal from "./PriceModal";
import CancelModal from "./CancelModal";

export default function UpdateModal({ isVisible, tokenId, marketplaceAddress, nftAddress, onClose }) {
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showPriceModal, setShowPriceModal] = useState(false);
    const hidePriceModal = () => setShowPriceModal(false);
    const [showCancelModal, setshowCancelModal] = useState(false);
    const hideCancelModal = () => setshowCancelModal(false);

    ///////////////////////
    // Handler Functions //
    ///////////////////////

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
            <Modal
                title={
                    <div className="p-2 text-3xl text-green-600 font-bold">
                        Update NFT listing price or cancel listing
                    </div>
                }
                isVisible={isVisible}
                width="800px"
                onCloseButtonPressed={onClose}
                customFooter={<p>Update NFT item listing price or cancel listing</p>}
            >
                <div>
                    <div className="m-5 text-2xl font-medium">
                        <p>Do you want to update listing price or cancel listing?</p>
                    </div>
                    <div className="m-5 flex justify-center">
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
