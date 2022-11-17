import { useState } from "react";
import { Modal, Input, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import nftMarketplaceAbi from "../../../constants/NftMarketplace.json";
import { ethers } from "ethers";

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

    // Function: updateListing
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
        onClose();
        setNewListingPrice("0");
        setIsLoading(false);
    };

    return (
        <Modal
            title={<div className="p-2 text-3xl text-green-600 font-bold">Update NFT listing price</div>}
            isVisible={isVisible}
            width="800px"
            onCloseButtonPressed={onClose}
            customFooter={<p>Update NFT listing price</p>}
        >
            <div>
                <div className="m-5 text-2xl font-medium">
                    <p>1. Enter new listing price in ETH into input field.</p>
                    <p>2. Press 'Update price' button.</p>
                    <p>3. Confirm transaction in your wallet.</p>
                    <p>4. Wait for transaction confirmation.</p>
                    <p>5. Refresh page to see new listing price of your NFT item.</p>
                </div>
                <div>
                    <div className="mt-7 mb-7 text-2xl font-bold text-center">Enter new listing price in ETH:</div>
                    <div className="mx-5 my-5 flex justify-center">
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
                        <div className="m-5">
                            <div role="status">
                                <svg
                                    class="inline mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}
