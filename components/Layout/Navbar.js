import Link from "next/link";

export default function Header({ children }) {
    return (
        <div className="flex border-b-4 border-lime-400">
            <div className="basis-1/3 flex justify-end items-center">
                <Link href="/">
                    <button
                        className="m-5 p-5 w-40 text-2xl text-lime-700 font-medium bg-lime-400 
                hover:bg-lime-500 active:bg-lime-600 border-4 border-lime-600 rounded-3xl
                transition ease-out duration-500"
                    >
                        Buy NFT
                    </button>
                </Link>
            </div>
            <div className="basis-1/3 flex justify-center">{children}</div>
            <div className="basis-1/3 flex justify-start items-center">
                <Link href="/sellNft">
                    <button
                        className="m-5 p-5 w-40 text-2xl text-lime-700 font-medium bg-lime-400 
                hover:bg-lime-500 active:bg-lime-600 border-4 border-lime-600 rounded-3xl
                transition ease-out duration-500"
                    >
                        Sell NFT
                    </button>
                </Link>
            </div>
        </div>
    );
}
