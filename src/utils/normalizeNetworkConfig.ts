import { chainIDChainName, chainIDExplorer, chainIDNativeCurrency, chainIDRPC } from "../helpers";
import { IKeys, INetwork } from "interface";

export const normalizeNetworkConfig = (
  network: INetwork,
  keys: IKeys
) => {
  const networkConfig = { ...network };
  if (!networkConfig.blockExplorerUrl) {
    networkConfig.blockExplorerUrl = chainIDExplorer[networkConfig.chainID];
  }
  if (!networkConfig.nativeCurrency) {
    networkConfig.nativeCurrency = chainIDNativeCurrency[networkConfig.chainID];
  }
  if (!networkConfig.chainName) {
    networkConfig.nativeCurrency = chainIDChainName[networkConfig.chainID];
  }
  if (!networkConfig.rpc) {
    let requiredRPC = chainIDRPC[networkConfig.chainID];
    if (requiredRPC && requiredRPC.includes("{{") && keys) {
      Object.entries(keys).forEach(([key, value]) =>
        { 
            requiredRPC = requiredRPC.replace(`{{${key}}}`, value);
        }
      );
      if(requiredRPC.includes('{{')){
        const missingKeys = Array.from(requiredRPC.matchAll(new RegExp(/{{\w+}}/gm)))
        console.error(`Please add next keys into a config: ${missingKeys.map((missing) => missing[0]).join(' ,')}`)
      }
    }
    networkConfig.rpc = requiredRPC;
  }
  return networkConfig;
};

type TConfigCheckerResult = {
  valid: boolean;
  errors: string[];
};

export const isConfigSufficient = (
  networkConfig: INetwork
): TConfigCheckerResult => {
  const emptyFields = [];
  if (!networkConfig.blockExplorerUrl) {
    emptyFields.push("blockExplorerUrl");
  }
  if (!networkConfig.nativeCurrency) {
    emptyFields.push("nativeCurrency");
  }
  if (!networkConfig.rpc) {
    emptyFields.push("rpc");
  }
  if (!networkConfig.chainName) {
    emptyFields.push("chainName");
  }
  return {
    valid: emptyFields.length === 0,
    errors: emptyFields,
  };
};
