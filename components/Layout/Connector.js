import { useMoralis } from "react-moralis";
import { ConnectButton } from "@web3uikit/web3";

const supportedChainsIds = ["31337", "5"];

export default function Header() {
    const { isWeb3Enabled, chainId } = useMoralis();

    return (
        <div>
            <div className="connectorButton">
                <ConnectButton moralisAuth={false} />
            </div>
            <div>
                {isWeb3Enabled ? (
                    <div>
                        {supportedChainsIds.includes(parseInt(chainId).toString()) ? (
                            <div>
                                <div className="connectorConnected">
                                    <p>Connected!</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="connectorNotSupportedChain">
                                    <p className="text-2xl font-bold">Not supported chain!</p>
                                    <p className="text-xl">{`Supported chains IDs: ${supportedChainsIds}`}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="connectorPleaseConnect">
                        <p>Please connect to a wallet!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
