import { useState } from "react";
import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import nftMarketplaceAbi from "../../../constants/NftMarketplace.json";
import { ethers } from "ethers";

export default function CancelListingModal({ nftAddress, tokenId, price, isVisible, marketplaceAddress, onClose }) {
    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Function: CancelListing
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

    // Handle cancel listing success function
    const handleCancelListingSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "NFT item listing canceled!",
            title: "Listing canceled",
            position: "bottomL",
        });
        onClose && onClose();
    };

    return (
        <Modal
            title={<div className="p-2 text-3xl text-red-600 font-bold">Cancel NFT item listing</div>}
            isVisible={isVisible}
            width="800px"
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            okText="CANCEL NFT LISTING"
            okButtonColor="red"
            cancelText="CANCEL"
            onOk={() => {
                cancelListing({
                    onError: (error) => console.log(error),
                    onSuccess: handleCancelListingSuccess,
                });
            }}
        >
            <div className="m-5 text-2xl font-medium">
                <p>1. Press 'CANCEL NFT LISTING' button.</p>
                <p>2. Wait for transaction confirmation.</p>
                <p>3. Refresh page to see that your NFT item is no more listed on the marketplace.</p>
                <p>(Step 3 will be skipped in the future after project update.)</p>
            </div>
            <div className="flex justify-center">
                <div className="mx-5 mt-5 mb-16">
                    <p className="text-3xl text-red-600 font-medium text-center">
                        Are you sure you want to delist your NFT item from the marketplace?
                    </p>
                </div>
            </div>
        </Modal>
    );
}
