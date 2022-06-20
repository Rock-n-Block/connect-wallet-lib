# Connect Wallet

This package provides the ability to connect Wallets to website or application via [MetaMask](https://metamask.io) extension (through a browser or the mobile application) and [WalletConnect](https://walletconnect.org) service using QR code scanner.

## Features

- Connect to any blockchains.
- Add Contracts by providing Contract address and ABI code.
- Work with Contracts methods.
- Check transactions in blockchain.
- Add custom blockchain.
- 
## Usage

#### 1. Install package.

NPM: 
```sh
npm install https://github.com/Rock-n-Block/connect-wallet-lib.git#master
```
Yarn:
```sh
yarn add https://github.com/Rock-n-Block/connect-wallet-lib.git#master
```

#### 2. Import and initialize ConnectWallet in project.

```typescript
import { ConnectWallet } from '@amfi/connect-wallet';
const connectWallet = new ConnectWallet();
```

#### 3. Install wallets instances.

All wallets instances is located in [`wallet-instances` repo](https://github.com/cucunber/wallet-instances.git)

Each branch of this repo consist one instance of wallet, to add it like a package use this structure:
`
https://github.com/cucunber/wallet-instances.git#wallet/{wallet-name}
`
where `wallet-name` is the name of the wallet (now available **MetaMask**, **WalletConnect**)

NPM: 
```sh
npm install https://github.com/cucunber/wallet-instances.git#wallet/{wallet-name}
```
Yarn:
```sh
yarn add https://github.com/cucunber/wallet-instances.git#wallet/{wallet-name}
```

To add your wallet:
1. Create branch from `https://github.com/cucunber/wallet-instances.git#abstract-wallet`
2. update `package.json` fields (name, version and etc)
3. implement all methods of a `AbstractConnector`

#### 4. Add wallets which will be used in your app with `use` method.

```typescript
import { MetaMask } from 'metamask-wallet/dist';
connectWallet.use([MetaMask]) ;
```

`.use` description:
| option | type                  | default | description                               |
|---------|-----------------------|---------|-------------------------------------------|
| wallets | [AbstractConstructor[]](https://github.com/Rock-n-Block/connect-wallet-lib/blob/feature/modular-wallet/src/abstract-connector/index.ts#L19) | []      | List of wallets which will be used in lib |

#### 5. Create `chains` config 
using [`TChainsConfig<T, K>`](https://github.com/Rock-n-Block/connect-wallet-lib/blob/feature/modular-wallet/src/interface.ts#L131) where `T` is **chains enum** and `K` is **providers enum**:

>> **Attention**, name of the provider should be same as the instance class name, so if the wallet class implementation is called **WalletConnect**, the name in the config must be **Wallet connect**:

```typescript
    class WalletConnect implements AbstractConnector {
        // implementation
    }
```
```typescript
    //connection
    connectWallet.use([WalletConnect]) ;
```

```typescript
export const is_production = true;

enum chainsEnum {
  Ethereum = 'Ethereum',
  "Binance-Smart-Chain" = "Binance-Smart-Chain",
}

enum providersEnum {
  MetaMask = 'MetaMask',
  WalletConnect = 'WalletConnect'
}

export const chains: TChainsConfig<chainsEnum, providersEnum> = {
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
      WalletConnect: { name: "WalletConnect" },
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
};
```

**updates**:
    1. Now you don't need to set `nativeCurrency`, `rpc`, `blockExplorerUrl` to `network` field, they are includes into the lib. If you pass this fields they will be used in the config.
    
List of `Native currencies`:
| chainId | Native Currency                          |
|---------|------------------------------------------|
| 1       | name: ETH, symbol: ETH, decimals: 18     |
| 3       | name: ROP, symbol: ROP, decimals: 18     |
| 4       | name: RIN, symbol: RIN, decimals: 18     |
| 5       | name: GOR, symbol: GOR, decimals: 18     |
| 42      | name: KOV, symbol: KOV, decimals: 18     |
| 128     | name: HT, symbol: HT, decimals: 18       |
| 256     | name: htt, symbol: htt, decimals: 18     |
| 242     | name: KAI, symbol: KAI, decimals: 18     |
| 24      | name: KAI, symbol: KAI, decimals: 18     |
| 25      | name: CRO, symbol: CRO, decimals: 8      |
| 56      | name: BNB, symbol: BNB, decimals: 18     |
| 97      | name: tBNB, symbol: tBNB, decimals: 18   |
| 137     | name: MATIC, symbol: MATIC, decimals: 18 |
| 338     | name: TCRO, symbol: TCRO, decimals: 8    |
| 80001   | name: MATIC, symbol: MATIC, decimals: 18 |
| 43113   | name: AVAX, symbol: AVAX, decimals: 18   |
| 43114   | name: AVAX, symbol: AVAX, decimals: 18   |
| 42220   | name: CELO, symbol: CELO, decimals: 18   |
| 44787   | name: CELO, symbol: CELO, decimals: 18   |
| 250     | name: FTM, symbol: FTM, decimals: 18     |
| 4002    | name: FTM, symbol: FTM, decimals: 18     |

List of `RPCs`:
>> **Attention**, chains with id `1`,`3`,`4`,`5`,`42` require **infuraId**. It's passed into chain config as `keys` field with object field `infuraId` like this

```typescript
keys: {
    infuraId: '2d76b686b0484e9ebecbaddd23cd37c7'
}
```

| chainId | RPC                                             |
|---------|-------------------------------------------------|
| 1       | https://mainnet.infura.io/v3/{{infuraId}}       |
| 3       | https://ropsten.infura.io/v3/{{infuraId}}       |
| 4       | https://rinkeby.infura.io/v3/{{infuraId}}       |
| 5       | https://goerli.infura.io/v3/{{infuraId}}        |
| 42      | https://kovan.infura.io/v3/{{infuraId}}         |
| 128     | https://http-mainnet.hecochain.com              |
| 256     | https://http-testnet.hecochain.com              |
| 242     | https://dev.kardiachain.io/                     |
| 24      | https://rpc.kardiachain.io                      |
| 25      | https://evm.cronos.org/                         |
| 56      | https://bsc-dataseed.binance.org/               |
| 97      | https://data-seed-prebsc-2-s1.binance.org:8545/ |
| 137     | https://polygon-rpc.com/                        |
| 338     | https://evm-t3.cronos.org/                      |
| 80001   | https://rpc-mumbai.matic.today                  |
| 43113   | https://api.avax-test.network/ext/bc/C/rpc      |
| 43114   | https://api.avax.network/ext/bc/C/rpc           |
| 42220   | https://forno.celo.org                          |
| 44787   | https://alfajores-forno.celo-testnet.org        |
| 250     | https://rpc.ftm.tools/                          |
| 4002    | https://rpc.testnet.fantom.network/             |

List of `Block explorers`:
| chainId | RPC                                            |
|---------|------------------------------------------------|
| 1       | https://etherscan.io/                          |
| 3       | https://ropsten.etherscan.io/"                 |
| 4       | https://rinkeby.etherscan.io/                  |
| 5       | https://goerli.etherscan.io/                   |
| 42      | https://kovan.etherscan.io/                    |
| 128     | https://scan.hecochain.com/home/index          |
| 256     | https://scan-testnet.hecochain.com/            |
| 242     | https://testnet.cardanoscan.io/                |
| 24      | https://cardanoscan.io/                        |
| 25      | https://cronoscan.com/                         |
| 56      | https://bscscan.com/                           |
| 97      | https://testnet.bscscan.com/                   |
| 137     | https://polygonscan.com/                       |
| 338     | https://testnet.cronoscan.com/                 |
| 80001   | https://mumbai.polygonscan.com/                |
| 43113   | https://avascan.info/                          |
| 43114   | https://testnet.avascan.info/                  |
| 42220   | https://explorer.celo.org/                     |
| 44787   | https://alfajores-blockscout.celo-testnet.org/ |
| 250     | https://explorer.fantom.network/"              |
| 4002    | https://explorer.testnet.fantom.network/       |