import { WalletLinkProvider } from "walletlink";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";

export interface IRPCMap {
  [chainId: number]: string;
}
export interface IWalletConnectProviderOptions {
  useProvider?: "rpc" | "infuraId" | "bridge";
  provider?: {
    bridge?: string;
    infuraId?: string;
    rpc?: IRPCMap;
  };
}

export interface IProvider extends IWalletConnectProviderOptions {
  name: string;
}

export type ContractWeb3 = Contract;

export interface IEvent {
  name: string;
  address: string;
  network: {
    name: string;
    chainId: number;
  };
}

export interface ICheckNet {
  chain: boolean,
  error?: IError,
}

export interface INativeCurrency {
  name: string,
  symbol: string,
  decimals: number,
}

export interface IEventError extends IEvent {
  code: number;
  message?: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export interface IConnect {
  address: string;
  type?: string;
  network: {
    name: string;
    chainID: number;
  };
}

export interface IConnectorMessage {
  code: number;
  type?: string;
  connected: boolean;
  provider?: string | any;
  message?: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export interface IError {
  code: number;
  type?: string;
  message?: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export interface ISettings {
  providerType?: boolean;
}

export interface INativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface INetwork {
  chainName: string;
  chainID: number;
  nativeCurrency?: INativeCurrency;
  rpc?: string;
  blockExplorerUrl?: string;
}

export interface IMessageProvider {
  code: number;
  message?: {
    title?: string;
    text: string;
  };
  provider?: string;
}

export interface IContract {
  [index: string]: Contract;
}

export interface INoNameContract {
  address: string;
  abi: AbiItem | Array<AbiItem>;
}

export interface IAddContract extends INoNameContract {
  name: string;
}

export interface IChain {
  name: string;
  chainID: number;
  hex: string;
}

export interface IKeys extends Record<string, string> {};

export type TChainsConfig<T extends string | number | symbol, K extends string | number | symbol> = {
  [key in T]: {
    name: string,
    network: INetwork
    provider: {
      [provider in K]?: IProvider
    },
    keys?: IKeys
  }
}

declare global {
  interface Window {
    onto: WalletLinkProvider;
  }
}
