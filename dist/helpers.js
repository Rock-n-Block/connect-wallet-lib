"use strict";
exports.__esModule = true;
exports.addChains = exports.getCode = exports.chainIDNativeCurrency = exports.chainIDChainName = exports.chainIDRPC = exports.chainIDExplorer = exports.codeMap = exports.parameters = void 0;
exports.parameters = {
    chainIDMap: {
        1: "0x1",
        3: "0x3",
        4: "0x4",
        5: "0x5",
        42: "0x2a",
        128: "0x80",
        256: "0x100",
        242: "0xf2",
        24: 24,
        25: "0x19",
        56: "0x38",
        97: "0x61",
        137: "0x89",
        338: "0x152",
        80001: "0x13881",
        43113: "0xa869",
        43114: "0xa86a",
        42220: "0xa4ec",
        44787: "0xaef3",
        250: "0xfa",
        4002: "0xfa2"
    },
    chainsMap: {
        "0x1": {
            name: "mainnet",
            chainID: 1
        },
        "0x3": {
            name: "ropsten",
            chainID: 3
        },
        "0x4": {
            name: "rinkeby",
            chainID: 4
        },
        "0x5": {
            name: "goerli",
            chainID: 5
        },
        "0x2a": {
            name: "kovan",
            chainID: 42
        },
        "0x80": {
            name: "heco",
            chainID: 128
        },
        "0x100": {
            name: "heco-testnet",
            chainID: 256
        },
        242: {
            name: "KardiachainTestnet",
            chainID: 242
        },
        24: {
            name: "Kardiachain",
            chainID: 24
        },
        "0x19": {
            name: "cronos-mainnet",
            chainID: 25
        },
        "0x38": {
            name: "binance",
            chainID: 56
        },
        "0x61": {
            name: "binance-testnet",
            chainID: 97
        },
        "0x89": {
            name: "polygon",
            chainID: 137
        },
        "0x152": {
            name: "cronos-testnet",
            chainID: 338
        },
        "0x13881": {
            name: "polygon-testnet",
            chainID: 80001
        },
        "0xa86a": {
            name: "avalanche",
            chainID: 43114
        },
        "0xa869": {
            name: "avalanche-testnet",
            chainID: 43113
        },
        "0xa4ec": {
            name: "celo",
            chainID: 42220
        },
        "0xaef3": {
            name: "celo-testnet",
            chainID: 44787
        },
        "0xfa": {
            name: "fantom-opera",
            chainID: 250
        },
        "0xfa2": {
            name: "fantom-testnet",
            chainID: 4002
        }
    }
};
exports.codeMap = {
    1: {
        type: "Success",
        name: "Provider connected"
    },
    2: {
        type: "Error",
        name: "Provider not found"
    },
    3: {
        type: "Error",
        name: "Not authorized"
    },
    4: {
        type: "Error",
        name: "Chain not selected or not equal to settings chain"
    },
    5: {
        type: "Error",
        name: "Qr code modal are closed"
    },
    6: {
        type: "Error",
        name: "Wallet disconnected"
    },
    7: {
        type: "Error",
        name: "Cant getting user address"
    },
    8: {
        type: "Error",
        name: "Not valid config"
    }
};
exports.chainIDExplorer = {
    1: "https://etherscan.io/",
    3: "https://ropsten.etherscan.io/",
    4: "https://rinkeby.etherscan.io/",
    5: "https://goerli.etherscan.io/",
    42: "https://kovan.etherscan.io/",
    128: "https://scan.hecochain.com/home/index",
    256: "https://scan-testnet.hecochain.com/",
    242: "https://testnet.cardanoscan.io/",
    24: "https://cardanoscan.io/",
    25: "https://cronoscan.com/",
    56: "https://bscscan.com/",
    97: "https://testnet.bscscan.com/",
    137: "https://polygonscan.com/",
    338: "https://testnet.cronoscan.com/",
    80001: "https://mumbai.polygonscan.com/",
    43114: "https://avascan.info/",
    43113: "https://testnet.avascan.info/",
    42220: "https://explorer.celo.org/",
    44787: "https://alfajores-blockscout.celo-testnet.org/",
    250: "https://explorer.fantom.network/",
    4002: "https://explorer.testnet.fantom.network/"
};
exports.chainIDRPC = {
    1: "https://mainnet.infura.io/v3/{{infuraId}}",
    3: "https://ropsten.infura.io/v3/{{infuraId}}",
    4: "https://ropsten.infura.io/v3/{{infuraId}}",
    5: "https://goerli.infura.io/v3/{{infuraId}}",
    42: "https://kovan.infura.io/v3/{{infuraId}}",
    128: "https://http-mainnet.hecochain.com",
    256: "https://http-testnet.hecochain.com",
    242: "https://dev.kardiachain.io/",
    24: "https://rpc.kardiachain.io",
    25: "https://evm.cronos.org/",
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-2-s1.binance.org:8545/",
    137: "https://polygon-rpc.com/",
    338: "https://evm-t3.cronos.org/",
    80001: "https://rpc-mumbai.matic.today",
    43113: "https://api.avax-test.network/ext/bc/C/rpc",
    43114: "https://api.avax.network/ext/bc/C/rpc",
    42220: "https://forno.celo.org",
    44787: "https://alfajores-forno.celo-testnet.org",
    250: "https://rpc.ftm.tools/",
    4002: "https://rpc.testnet.fantom.network/"
};
exports.chainIDChainName = {
    1: "Ethereum Mainnet",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Goerli",
    42: "Kovan",
    128: "Heco Mainnet",
    256: "Heco Testnet",
    242: "Kardia Testnet",
    24: "Kardia Mainnet",
    25: "Cronos Mainnet",
    56: "Binance Mainnet",
    97: "Binance Testnet",
    137: "Polygon Testnet",
    338: "Cronos Testnet",
    80001: "Polygon Testnet",
    43113: "Avax Mainnet",
    43114: "Avax Testnet",
    42220: "Celo Mainnet",
    44787: "Celo Testnet",
    250: "Fantom Mainnet",
    4002: "Fantom Testnet"
};
exports.chainIDNativeCurrency = {
    1: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18
    },
    3: {
        name: "ROP",
        symbol: "ROP",
        decimals: 18
    },
    4: {
        name: "RIN",
        symbol: "RIN",
        decimals: 18
    },
    5: {
        name: "GOR",
        symbol: "GOR",
        decimals: 18
    },
    42: {
        name: "KOV",
        symbol: "KOV",
        decimals: 18
    },
    128: {
        name: "HT",
        symbol: "HT",
        decimals: 18
    },
    256: {
        name: "htt",
        symbol: "htt",
        decimals: 18
    },
    242: {
        name: "KAI",
        symbol: "KAI",
        decimals: 18
    },
    24: {
        name: "KAI",
        symbol: "KAI",
        decimals: 18
    },
    25: {
        name: "CRO",
        symbol: "CRO",
        decimals: 8
    },
    56: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18
    },
    97: {
        name: "tBNB",
        symbol: "tBNB",
        decimals: 18
    },
    137: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
    },
    338: {
        name: "TCRO",
        symbol: "TCRO",
        decimals: 8
    },
    80001: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
    },
    43113: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18
    },
    43114: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18
    },
    42220: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18
    },
    44787: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18
    },
    250: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18
    },
    4002: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18
    }
};
var getCode = function (code) { return exports.codeMap[code]; };
exports.getCode = getCode;
var addChains = function (chains) {
    chains.map(function (chain) {
        var name = chain.name, chainID = chain.chainID, hex = chain.hex;
        exports.parameters.chainIDMap[chainID] = hex;
        exports.parameters.chainsMap[hex] = { name: name, chainID: chainID };
    });
    return exports.parameters;
};
exports.addChains = addChains;
