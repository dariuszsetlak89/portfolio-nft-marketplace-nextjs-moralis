import { useState } from "react";
import { Modal, Input, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { nftMarketplaceAbi } from "../../../constants";
import { ethers } from "ethers";
import LoadingSpinner from "../../Animations/LoadingSpinner";

export default function UpdateListingModal({ isVisible, tokenId, marketplaceAddress, nftAddress, onClose }) {
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [newListingPrice, setNewListingPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    /////////////////////
    //  Notifications  //
    /////////////////////
    const dispatch = useNotification();

    ////////////////////////
    // Contract Functions //
    ////////////////////////

    // Contract function: updateListing
    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(newListingPrice || "0"),
        },
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle update listing price function
    const handleUpdatePrice = async () => {
        setIsLoading(true);
        await updateListing({
            onError: (error) => console.log(error),
            onSuccess: handleUpdatePriceSuccess,
        });
    };

    // Handle update listing price success function
    const handleUpdatePriceSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "Listing price updated!",
            title: "Listing price updated",
            position: "bottomL",
        });
        setNewListingPrice("0");
        setIsLoading(false);
        onClose();
    };

    return (
        // Update listing price modal
        <Modal
            title={<div className="priceModalTitle">Update NFT listing price</div>}
            isVisible={isVisible}
            width="800px"
            onCloseButtonPressed={onClose}
            customFooter={<p>Update NFT listing price</p>}
        >
            <div>
                <div className="priceModalDescription">
                    <p>1. Enter new listing price in ETH into input field.</p>
                    <p>2. Press 'Update price' button.</p>
                    <p>3. Confirm transaction in your wallet.</p>
                    <p>4. Wait for transaction confirmation.</p>
                    <p>5. Refresh page to see new listing price of your NFT item.</p>
                </div>
                <div>
                    {/* New listing price input */}
                    <div className="priceModalEnterTitle">Enter new listing price in ETH:</div>
                    <div className="priceModalInputField">
                        <Input
                            label="Enter new NFT listing price in ETH"
                            name="New listing price"
                            type="number"
                            width="300px"
                            onChange={(event) => {
                                setNewListingPrice(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="m-5 text-center">
                    {isLoading == false ? (
                        // Update listing price button
                        <button className="myButtonGreen" onClick={handleUpdatePrice}>
                            Update price
                        </button>
                    ) : (
                        // Loading spinner animation
                        <LoadingSpinner />
                    )}
                </div>
            </div>
        </Modal>
    );
}
