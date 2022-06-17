import { IKeys, INetwork, IProvider, ISettings, TChainsConfig } from "interface";
export enum chainsEnum {
  Ethereum = 'Ethereum',
  "Binance-Smart-Chain" = "Binance-Smart-Chain",
}
export enum providersEnum {
  MetaMask = 'MetaMask',
  WalletConnect = 'WalletConnect'
}

export interface IConnectWallet {
  wallets: string[];
  network: INetwork;
  provider: {
    [index in providersEnum]?: IProvider;
  };
  settings: ISettings;
  keys: IKeys;
}

export const is_production = true;

export const chains = {
  [chainsEnum["Binance-Smart-Chain"]]: {
    name: chainsEnum["Binance-Smart-Chain"],
    network: {
      chainID: is_production ? 56 : 97,
      chainName: is_production
        ? "Binance Smart Chain"
        : "Binance Smart Chain Testnet",
    },
    provider: {
      MetaMask: { name: "MetaMask" },
      WalletConnect: { name: "WalletsConnect" },
    },
  },
  [chainsEnum.Ethereum]: {
    name: chainsEnum.Ethereum,
    network: {
      chainID: is_production ? 1 : 4,
      chainName: is_production ? 'Ethereum Mainnet' : 'Rinkeby Testnet',
    },
    provider: {
      MetaMask: { name: "MetaMask" },
      WalletConnect: { name: "WalletsConnect" },
    },
    keys: {
      infuraId: '2d76b686b0484e9ebecbaddd23cd37c7'
    }
  },
} as TChainsConfig<chainsEnum, providersEnum>;

export const connectWallet = (chainName: chainsEnum): IConnectWallet => {
  const chain = chains[chainName];

  return {
    wallets: ["MetaMask"],
    network: chain.network,
    provider: chain.provider,
    settings: { providerType: true },
    keys: chain.keys
  };
};
