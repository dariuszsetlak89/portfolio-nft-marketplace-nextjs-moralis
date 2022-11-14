import { useMoralisQuery, useMoralis } from "react-moralis";
import ListedNft from "./ListedNft";

export default function NftMarketplace() {
    const { isWeb3Enabled } = useMoralis();

    // Number of NFT items to list on home page
    const numberOfItems = 12;

    const { data: listedNfts, isFetching: fetchingListedNftItems } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(numberOfItems).descending("tokenId")
    );
    console.log(listedNfts);

    return (
        <div className="container mx-auto p-5">
            <div>
                {isWeb3Enabled ? (
                    <div>
                        <h1 className="m-5 text-3xl font-bold text-green-600 text-center">
                            Listed NFT items
                        </h1>
                        <div className="mx-5 mt-5 mb-10 text-xl font-medium text-center">
                            <div>Want to grab NFT? Simply click on it and buy selected item!</div>
                            <div>
                                You are the NFT owner? Just click on it to update listing price or
                                to cancel the listing.
                            </div>
                        </div>
                        {fetchingListedNftItems == true ? (
                            <div>Loading listed NFT items...</div>
                        ) : (
                            <div className="flex flex-wrap">
                                {listedNfts.map((nft) => {
                                    console.log(nft.attributes);
                                    const {
                                        price,
                                        nftAddress,
                                        tokenId,
                                        marketplaceAddress,
                                        seller,
                                    } = nft.attributes;
                                    return (
                                        <div className="m-2">
                                            <ListedNft
                                                price={price}
                                                nftAddress={nftAddress}
                                                tokenId={tokenId}
                                                marketplaceAddress={marketplaceAddress}
                                                seller={seller}
                                                key={`${nftAddress}-${tokenId}`}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <h1 className="mx-5 mt-5 mb-10 text-3xl font-bold text-red-600 text-center">
                        Not connected to Web3 wallet!
                    </h1>
                )}
            </div>
        </div>
    );
}
