import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";

const supportedChainsIds = ["31337", "5"];

export default function Header() {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <div>
            <div className="py-5">
                <div className="flex justify-center p-2 ">
                    <ConnectButton moralisAuth={false} />
                </div>
                <div>
                    {isWeb3Enabled ? (
                        <div>
                            {supportedChainsIds.includes(parseInt(chainId).toString()) ? (
                                <div>
                                    <div className="p-2 text-xl text-center text-green-600 font-bold">
                                        <p>Connected!</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="p-2 text-center text-red-600">
                                        <p className="text-2xl font-bold">Not supported chain!</p>
                                        <p className="p-2 text-xl">{`Supported chains IDs: ${supportedChainsIds}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-2 text-xl text-center text-red-600 font-bold">
                            <p>Please connect to a wallet!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
