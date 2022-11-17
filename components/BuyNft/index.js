import { useMoralis } from "react-moralis";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { Tooltip } from "@web3uikit/core";
import contractAddresses from "../../constants/contractAddresses.json";
import GET_ACTIVE_ITEMS from "../../constants/subgraphQueries";
import ListedNft from "./ListedNft";

export default function NftMarketplace() {
    const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis();
    const router = useRouter();

    ///////////////////////////
    // Read contract address //
    ///////////////////////////

    // Read connected network ID and contract address of connected network from `contractAddresses` file
    const chainId = parseInt(chainIdHex);
    const marketplaceAddress = chainId in contractAddresses ? contractAddresses[chainId]["NftMarketplace"][0] : null;
    // console.log("chainId:", chainId);
    // console.log("marketplaceAddress:", marketplaceAddress);

    ///////////////////
    // UseQuery Hook //
    ///////////////////
    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

    return (
        <div className="container mx-auto py-5 min-h-content">
            {isWeb3Enabled ? (
                <div>
                    <h1 className="m-5 text-4xl font-bold text-green-600 text-center">Listed NFT items</h1>
                    <div className="m-5 text-xl font-medium text-center">
                        <div>Want to grab NFT? Simply click on it and buy selected item!</div>
                        <div>
                            You are the NFT owner? Just click on it to update listing price or to cancel the listing.
                        </div>
                    </div>
                    {/* Refresh button */}
                    <div className="p-4 flex justify-center">
                        <Tooltip content={"Refresh page"} position="right">
                            <div className="refreshButton">
                                <Image
                                    src="/images/refresh.png"
                                    alt="Refresh button"
                                    width={32}
                                    height={32}
                                    onClick={() => router.reload()}
                                />
                            </div>
                        </Tooltip>
                    </div>

                    <div className="flex justify-center">
                        {loading || !listedNfts == true ? (
                            <div className="m-5 text-2xl text-orange-500 font-medium text-center">
                                Loading listed NFT items...
                            </div>
                        ) : (
                            <div className="flex flex-wrap m-6 justify-left">
                                {listedNfts.activeItems.map((nft) => {
                                    // Mapping through listed and active NFT items
                                    const { price, nftAddress, tokenId, seller } = nft;
                                    return (
                                        <div className="m-2 w-64" key={`${nftAddress}${tokenId}`}>
                                            <div className={seller == account ? "nftOwner" : "notNftOwner"}>
                                                <ListedNft
                                                    price={price}
                                                    nftAddress={nftAddress}
                                                    tokenId={tokenId}
                                                    marketplaceAddress={marketplaceAddress}
                                                    seller={seller}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <h1 className="mx-5 mt-5 mb-10 text-3xl font-bold text-green-600 text-center">
                    Web3 wallet not connected!
                </h1>
            )}
        </div>
    );
}
