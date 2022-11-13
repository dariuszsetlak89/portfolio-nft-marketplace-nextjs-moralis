import Head from "next/head";
import Layout from "../components/Layout";
import SellNft from "../components/SellNft";

export default function Home() {
    return (
        <div>
            <Layout>
                <SellNft />
            </Layout>
        </div>
    );
}
