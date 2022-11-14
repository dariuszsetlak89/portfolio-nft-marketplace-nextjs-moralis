export default function UpdateListingModal({
    nftAddress,
    tokenId,
    isVisible,
    marketplaceAddress,
    onClose,
}) {
    ///////////////////
    //  State Hooks  //
    ///////////////////
    const [newListingPrice, setNewListingPrice] = useState(0);

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
            newPrice: ethers.utils.parseEther(priceToUpdateListingWith || "0"),
        },
    });

    ///////////////////////
    // Handler Functions //
    ///////////////////////

    // Handle update listing success function
    const handleUpdateListingSuccess = async (tx) => {
        await tx.wait(1);
        dispatch({
            type: "success",
            message: "listing updated",
            title: "Listing updated - please refresh (and move blocks)",
            position: "bottomL",
        });
        onClose && onClose();
        setNewListingPrice("0");
    };

    return (
        <Modal
            isVisible={isVisible}
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={() => {
                updateListing({
                    onError: (error) => {
                        console.log(error);
                    },
                    onSuccess: handleUpdateListingSuccess,
                });
            }}
        >
            <Input
                label="Update NFT listing price in ETH"
                name="New listing price"
                type="number"
                onChange={(event) => {
                    setNewListingPrice(event.target.value);
                }}
            />
        </Modal>
    );
}
