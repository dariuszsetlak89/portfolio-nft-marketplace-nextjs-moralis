import { Modal, useNotification } from "@web3uikit/core";
import { useWeb3Contract } from "react-moralis";
import { useState } from "react";
import { ethers } from "ethers";
import { nftMarketplaceAbi } from "../../../constants";
import LoadingSpinner from "../../Animations/LoadingSpinner";

export default function BuyModal({ isVisible, marketplaceAddress, nftAddress, tokenId, price, onClose }) {
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

    // Contract function: BuyItem
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

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle buy item function
    const handleBuyItem = async () => {
        setIsLoading(true);
        await buyItem({
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
        setIsLoading(false);
        onClose();
    };

    return (
        // Buy modal
        <Modal
            title={<div className="buyModalTitle">Buy NFT item</div>}
            isVisible={isVisible}
            width="800px"
            onCloseButtonPressed={onClose}
            customFooter={<p>Buy NFT item</p>}
        >
            <div>
                <div className="buyModalDescription">
                    <p>1. Press 'Buy NFT item' button.</p>
                    <p>2. Confirm transaction in your wallet.</p>
                    <p>3. Wait for transaction confirmation .</p>
                    <p>
                        4. Refresh page to see, that your NFT is not listed at the marketplace, because you just bought
                        it!
                    </p>
                </div>
                <div className="buyModalShowPrice">
                    <div className="buyModalShowPriceDescription">
                        Selected NFT item buy price:{" "}
                        <span className="font-bold">{ethers.utils.formatEther(price.toString())} ETH</span>
                    </div>
                    <div className="buyModalBuyButton">
                        {isLoading == false ? (
                            // Buy button
                            <button className="myButtonBlue" onClick={handleBuyItem}>
                                Buy NFT
                            </button>
                        ) : (
                            // Loading spinner animation
                            <LoadingSpinner />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
