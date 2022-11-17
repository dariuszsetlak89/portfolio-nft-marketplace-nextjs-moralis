import Image from "next/image";

export default function Header() {
    return (
        <div className="px-10 pt-10 pb-5 md:flex">
            <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT gold coin" width={125} height={125} />
            </div>
            <div className="m-auto basis-3/5 flex justify-center">
                <Image
                    src="/images/nft-marketplace-caption.png"
                    alt="NFT Marketplace wordart"
                    width={500}
                    height={100}
                    priority="true"
                    className="w-auto"
                />
            </div>
            <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                <Image src="/images/nft-graphics/nft-logo-green.png" alt="NFT gold coin" width={125} height={125} />
            </div>
        </div>
    );
}
