import Head from "next/head";
import Layout from "../components/Layout";
import BuyNft from "../components/BuyNft";

// Buy NFT
export default function Home() {
    return (
        <div>
            <Head>
                <title>NFT Marketplace | Buy NFT </title>
                <meta name="description" content="NFT Marketplace - buy NFT" />
            </Head>
            <Layout>
                <BuyNft />
            </Layout>
        </div>
    );
}
