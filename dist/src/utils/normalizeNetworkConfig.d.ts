import { IKeys, INetwork } from "interface";
export declare const normalizeNetworkConfig: (network: INetwork, keys: IKeys) => {
    chainName: string;
    chainID: number;
    nativeCurrency?: import("interface").INativeCurrency;
    rpc?: string;
    blockExplorerUrl?: string;
};
declare type TConfigCheckerResult = {
    ok: boolean;
    errors: string[];
};
export declare const isConfigSufficient: (networkConfig: INetwork) => TConfigCheckerResult;
export {};
