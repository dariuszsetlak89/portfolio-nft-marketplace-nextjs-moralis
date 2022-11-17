import Image from "next/image";

export default function Header() {
    return (
        <div className="header">
            <div className="headerLogo">
                <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT gold coin" width={125} height={125} />
            </div>
            <div className="headerCaption">
                <Image
                    src="/images/nft-marketplace-caption.png"
                    alt="NFT Marketplace wordart"
                    width={500}
                    height={100}
                    priority="true"
                    className="w-auto"
                />
            </div>
            <div className="headerLogo">
                <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT gold coin" width={125} height={125} />
            </div>
        </div>
    );
}
