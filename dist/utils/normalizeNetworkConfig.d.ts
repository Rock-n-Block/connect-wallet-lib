import { IKeys, INetwork } from "interface";
export declare const normalizeNetworkConfig: (network: INetwork, keys: IKeys) => {
    chainID: number;
    chainName?: string;
    nativeCurrency?: import("interface").INativeCurrency;
    rpc?: string;
    blockExplorerUrl?: string;
};
declare type TConfigCheckerResult = {
    valid: boolean;
    errors: string[];
};
export declare const isConfigSufficient: (networkConfig: INetwork) => TConfigCheckerResult;
export {};
