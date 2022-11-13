import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="pt-5 pb-2 flex">
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/nft-graphics/nft-logo-green.png"
                        alt="NFT coin"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/nft-graphics/eth-coin-green.png"
                        alt="NFT coin"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/nft-graphics/nft-logo-green.png"
                        alt="NFT coin"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/nft-graphics/eth-coin-green.png"
                        alt="NFT coin"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="basis-1/5 flex justify-center transform hover:scale-125 transition ease-out duration-500">
                    <Image
                        src="/images/nft-graphics/nft-logo-green.png"
                        alt="NFT coin"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <p className="p-2 text-center font-medium text-xl text-lime-600">
                Copyright © 2022 dariuszsetlak89
            </p>
        </footer>
    );
}
