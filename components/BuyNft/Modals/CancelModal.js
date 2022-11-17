import { useState } from "react";
import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { nftMarketplaceAbi } from "../../../constants";
import LoadingSpinner from "../../Animations/LoadingSpinner";

export default function CancelListingModal({ isVisible, tokenId, marketplaceAddress, nftAddress, onClose }) {
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [isLoading, setIsLoading] = useState(false);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: CancelListing
    const { runContractFunction: cancelListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "cancelListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle cancel listing function
    const handleCancelListing = async () => {
        setIsLoading(true);
        await cancelListing({
            onError: (error) => console.log(error),
            onSuccess: handleCancelListingSuccess,
        });
    };

    // Handle cancel listing success function
    const handleCancelListingSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "NFT item listing canceled!",
            title: "Listing canceled",
            position: "bottomL",
        });
        setIsLoading(false);
        onClose();
    };

    return (
        // Cancel modal
        <Modal
            title={<div className="cancelModalTitle">Cancel NFT item listing</div>}
            isVisible={isVisible}
            width="800px"
            onCloseButtonPressed={onClose}
            customFooter={<p>Cancel NFT item listing</p>}
        >
            <div className="cancelModalDescription">
                <p>1. Press 'Cancel listing' button.</p>
                <p>2. Confirm transaction in your wallet.</p>
                <p>3. Wait for transaction confirmation.</p>
                <p>3. Refresh page to see that your NFT item is no more listed on the marketplace.</p>
            </div>
            <div className="m-5 text-center">
                {isLoading == false ? (
                    // Cancel listing button
                    <button className="myButtonRed" onClick={handleCancelListing}>
                        Cancel listing
                    </button>
                ) : (
                    // Loading spinner animation
                    <LoadingSpinner />
                )}
            </div>
        </Modal>
    );
}
