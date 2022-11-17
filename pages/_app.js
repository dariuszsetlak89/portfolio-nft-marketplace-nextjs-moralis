import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import Head from "next/head";
import "../styles/globals.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/35130/portfolio-nft-marketplace/v1.0.0",
});

function NftMarketplace({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <ApolloProvider client={client}>
                <NotificationProvider>
                    <Head>
                        <title>NFT Marketplace</title>
                        <meta
                            name="description"
                            content="NFT Marketplace - buy listed NFTs or list and sell your own NFTs"
                        />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    <Component {...pageProps} />
                </NotificationProvider>
            </ApolloProvider>
        </MoralisProvider>
    );
}

export default NftMarketplace;
