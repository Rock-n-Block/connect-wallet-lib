"use strict";
var _a;
exports.__esModule = true;
exports.connectWallet = exports.chains = exports.is_production = exports.providersEnum = exports.chainsEnum = void 0;
var chainsEnum;
(function (chainsEnum) {
    chainsEnum["Ethereum"] = "Ethereum";
    chainsEnum["Binance-Smart-Chain"] = "Binance-Smart-Chain";
})(chainsEnum = exports.chainsEnum || (exports.chainsEnum = {}));
var providersEnum;
(function (providersEnum) {
    providersEnum["MetaMask"] = "MetaMask";
    providersEnum["WalletConnect"] = "WalletConnect";
})(providersEnum = exports.providersEnum || (exports.providersEnum = {}));
exports.is_production = true;
exports.chains = (_a = {},
    _a[chainsEnum["Binance-Smart-Chain"]] = {
        name: chainsEnum["Binance-Smart-Chain"],
        network: {
            chainID: exports.is_production ? 56 : 97,
            chainName: exports.is_production
                ? "Binance Smart Chain"
                : "Binance Smart Chain Testnet"
        },
        provider: {
            MetaMask: { name: "MetaMask" },
            WalletConnect: { name: "WalletsConnect" }
        }
    },
    _a[chainsEnum.Ethereum] = {
        name: chainsEnum.Ethereum,
        network: {
            chainID: exports.is_production ? 1 : 4,
            chainName: exports.is_production ? 'Ethereum Mainnet' : 'Rinkeby Testnet'
        },
        provider: {
            MetaMask: { name: "MetaMask" },
            WalletConnect: { name: "WalletsConnect" }
        },
        keys: {
            infuraId: '2d76b686b0484e9ebecbaddd23cd37c7'
        }
    },
    _a);
var connectWallet = function (chainName) {
    var chain = exports.chains[chainName];
    return {
        wallets: ["MetaMask"],
        network: chain.network,
        provider: chain.provider,
        settings: { providerType: true },
        keys: chain.keys
    };
};
exports.connectWallet = connectWallet;
