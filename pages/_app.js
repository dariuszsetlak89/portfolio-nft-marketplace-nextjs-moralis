import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "@web3uikit/core";
import Head from "next/head";
import "../styles/globals.css";

function NftMarketplace({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Head>
                    <title>NFT Marketplace</title>
                    <meta name="description" content="NFT Marketplace" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default NftMarketplace;
