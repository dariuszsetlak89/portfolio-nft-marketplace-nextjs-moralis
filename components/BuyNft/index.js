import { useMoralis } from "react-moralis";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Tooltip } from "@web3uikit/core";
import { contractAddresses } from "../../constants";
import GET_ACTIVE_ITEMS from "../../constants/subgraphQueries";
import Image from "next/image";
import NftCard from "./NftCard";

export default function NftMarketplace() {
    /////////////////////
    // useMoralis Hook //
    /////////////////////
    const { isWeb3Enabled, account, chainId: chainIdHex } = useMoralis();

    ////////////////////
    // useRouter Hook //
    ////////////////////
    const router = useRouter();

    ///////////////////////////
    // Read contract address //
    ///////////////////////////
    const chainId = parseInt(chainIdHex);
    const marketplaceAddress = chainId in contractAddresses ? contractAddresses[chainId]["NftMarketplace"][0] : null;

    ///////////////////
    // useQuery Hook //
    ///////////////////
    const { loading, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

    return (
        <div className="buyNftIndex">
            {isWeb3Enabled ? (
                <div>
                    <h1 className="buyNftIndexTitle">Listed NFT items</h1>
                    <div className="buyNftIndexDescription">
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
                                    className="hover:animate-spin"
                                />
                            </div>
                        </Tooltip>
                    </div>
                    {/* Listed NFT items */}
                    <div className="flex justify-center">
                        {loading || !listedNfts == true ? (
                            <div className="buyNftIndexLoading">Loading listed NFT items...</div>
                        ) : (
                            <div className="buyNftIndexItems">
                                {listedNfts.activeItems.map((nft) => {
                                    // Mapping through listed and active NFT items
                                    const { price, nftAddress, tokenId, seller } = nft;
                                    return (
                                        <div className="m-2 w-64" key={`${nftAddress}${tokenId}`}>
                                            <div className={seller == account ? "nftOwner" : "notNftOwner"}>
                                                <NftCard
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
                <h1 className="walletNotConnected">Web3 wallet not connected!</h1>
            )}
        </div>
    );
}
