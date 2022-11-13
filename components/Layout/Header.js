import Image from "next/image";

export default function Header() {
    return (
        <div className="px-10 py-5 flex border-b-4 border-lime-400">
            <div className="basis-3/10 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                <Image
                    src="/images/nft-graphics/nft-logo-green.png"
                    alt="NFT gold coin"
                    width={100}
                    height={100}
                />
            </div>
            <div className="m-auto basis-4/10 flex-none justify-center">
                <Image
                    src="/images/nft-marketplace-caption.png"
                    alt="NFT Marketplace wordart"
                    width={500}
                    height={100}
                    priority="true"
                />
            </div>
            <div className="basis-3/10 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                <Image
                    src="/images/nft-graphics/nft-logo-green.png"
                    alt="NFT gold coin"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
}
