import { IKeys, INetwork, IProvider, ISettings, TChainsConfig } from "interface";
export declare enum chainsEnum {
    Ethereum = "Ethereum",
    "Binance-Smart-Chain" = "Binance-Smart-Chain"
}
export declare enum providersEnum {
    MetaMask = "MetaMask",
    WalletConnect = "WalletConnect"
}
export interface IConnectWallet {
    wallets: string[];
    network: INetwork;
    provider: {
        [index: string]: IProvider;
    };
    settings: ISettings;
    keys: IKeys;
}
export declare const is_production = true;
export declare const chains: TChainsConfig<chainsEnum, providersEnum>;
export declare const connectWallet: (chainName: chainsEnum) => IConnectWallet;
