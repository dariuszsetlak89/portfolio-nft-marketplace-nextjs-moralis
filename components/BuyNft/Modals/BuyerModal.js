import { useState } from "react";
import { Modal, Card } from "@web3uikit/core";
import { ethers } from "ethers";
import { Tooltip } from "@web3uikit/core";
import Image from "next/image";
import BuyModal from "./BuyModal";

export default function BuyerModal({
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
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [showBuyModal, setShowBuyModal] = useState(false);
    const hideBuyModal = () => setShowBuyModal(false);

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle update listing success function
    const handleBuyButton = async () => {
        setShowBuyModal(true);
        onClose();
    };

    return (
        <div>
            {/* Buyer modal */}
            <Modal
                title={<div className="buyerModalTitle">Do you want to buy me?</div>}
                isVisible={isVisible}
                width="800px"
                onCloseButtonPressed={onClose}
                customFooter={<p>Do you want to buy me?</p>}
            >
                <div>
                    <div className="mx-52">
                        {/* NFT item card */}
                        <Card title={tokenName} description={tokenDescription}>
                            <div className="buyerModalNftCard">
                                <div>
                                    <div className="text-2xl font-bold">#{tokenId}</div>
                                    <div className="italic">
                                        Owned by <span className="font-bold">{cuttedSellerAddress}</span>
                                    </div>
                                </div>
                                <div className="buyerModalNftCardImage">
                                    <Tooltip content={"Buy me!"} position="left" minWidth={80} bgColor="#ff0000">
                                        <Image
                                            loader={() => imageURI}
                                            src={imageURI}
                                            alt="Listed NFT item"
                                            height={200}
                                            width={225}
                                            priority="true"
                                            unoptimized
                                        />
                                    </Tooltip>
                                </div>
                                <div className="font-bold">Price: {ethers.utils.formatUnits(price, "ether")} ETH</div>
                            </div>
                        </Card>
                    </div>
                    <div>
                        {/* Buy item? */}
                        <div className="buyerModalDescription">
                            <p>Do you want to buy me?</p>
                        </div>
                        <div className="buyerModalButton">
                            <button className="myButtonBlue" onClick={handleBuyButton}>
                                Buy item
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <BuyModal
                isVisible={showBuyModal}
                tokenId={tokenId}
                marketplaceAddress={marketplaceAddress}
                nftAddress={nftAddress}
                price={price}
                onClose={hideBuyModal}
            />
        </div>
    );
}
