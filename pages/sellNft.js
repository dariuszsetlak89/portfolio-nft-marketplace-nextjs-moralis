import Head from "next/head";
import Layout from "../components/Layout";
import SellNft from "../components/SellNft";

// Sell NFT
export default function Home() {
    return (
        <div>
            <Head>
                <title>NFT Marketplace | Sell NFT</title>
                <meta name="description" content="NFT Marketplace - sell NFT" />
            </Head>
            <Layout>
                <SellNft />
            </Layout>
        </div>
    );
}
