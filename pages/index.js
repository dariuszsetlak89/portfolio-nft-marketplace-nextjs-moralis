import Image from "next/image";
import { useMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";

export default function Home() {
    const { isWeb3Enabled } = useMoralis();

    // Number of NFT items to list on home page
    const numberOfItems = 10;

    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(numberOfItems).descending("tokenId")
    );
    console.log(listedNfts);

    return (
        <div className="container mx-auto">
            <h1 className="px-4 pt-4 pb-2 font-bold text-2xl">Recently listed NFT items</h1>
            <h2 className="px-4 pt-2 pb-8">
                If you own the item, click to update it's selling price! If not, click to buy it!
            </h2>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes);
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes;
                            return (
                                <div className="m-2">
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                </div>
                            );
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    );
}
