import Link from "next/link";

function test() {
    console.log("TEST");
}

export default function Header({ children }) {
    return (
        <div className="p-5  border-b-4 border-lime-400 md:flex">
            <div className="basis-1/3 flex justify-center items-center">
                <Link href="/">
                    <button className="myButtonLime">Buy NFT</button>
                </Link>
            </div>
            <div className="basis-1/3 flex justify-center">{children}</div>
            <div className="basis-1/3 flex justify-center items-center">
                <Link href="/sellNft">
                    <button className="myButtonLime">Sell NFT</button>
                </Link>
            </div>
        </div>
    );
}
