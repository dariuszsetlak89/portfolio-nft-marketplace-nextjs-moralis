import Link from "next/link";

export default function Header({ children }) {
    return (
        <div className="navbar">
            <div className="navbarButton">
                <Link href="/">
                    <button className="myButtonLime">Buy NFT</button>
                </Link>
            </div>
            <div className="navbarChildren">{children}</div>
            <div className="navbarButton">
                <Link href="/sell-nft">
                    <button className="myButtonLime">Sell NFT</button>
                </Link>
            </div>
        </div>
    );
}
