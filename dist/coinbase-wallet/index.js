"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CoinbaseWalletConnect = void 0;
var rxjs_1 = require("rxjs");
var wallet_sdk_1 = __importDefault(require("@coinbase/wallet-sdk"));
var helpers_1 = require("../helpers");
var abstract_connector_1 = require("../abstract-connector");
var CoinbaseWalletConnect = /** @class */ (function (_super) {
    __extends(CoinbaseWalletConnect, _super);
    /**
     * CoinbaseWalletConnect class to connect browser Coinbase Wallet extention to your application
     * using connect wallet.
     */
    function CoinbaseWalletConnect(network) {
        var _this = _super.call(this) || this;
        _this.chainID = network.chainID;
        if (network.chainName)
            _this.chainName = network.chainName;
        if (network.nativeCurrency)
            _this.nativeCurrency = network.nativeCurrency;
        if (network.rpc)
            _this.rpc = network.rpc;
        if (network.blockExplorerUrl)
            _this.blockExplorerUrl = network.blockExplorerUrl;
        return _this;
    }
    /**
     * Connect Coinbase Wallet browser. Create connection with connect
     * wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    CoinbaseWalletConnect.prototype.connect = function (provider) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var coinbaseWallet = new wallet_sdk_1["default"]({
                darkMode: false,
                appName: 'RnB Connect Wallet',
                overrideIsMetaMask: true
            });
            var chain = helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[_this.chainID]];
            if (!provider.useProvider) {
                _this.connector = coinbaseWallet.makeWeb3Provider();
            }
            else {
                var rpcProvider = provider.useProvider === 'rpc'
                    ? provider.provider.rpc.rpc[_this.chainID]
                    : "https://" + chain.name + ".infura.io/v3/" + provider.provider.infura.infuraId;
                _this.connector = coinbaseWallet.makeWeb3Provider(rpcProvider, _this.chainID);
            }
            resolve({
                code: 1,
                connected: true,
                provider: _this.connector,
                message: {
                    title: 'Success',
                    subtitle: 'CoinbaseWallet Connect',
                    text: "CoinbaseWallet found and connected."
                }
            });
        });
    };
    CoinbaseWalletConnect.prototype.ethRequestAccounts = function () {
        return this.connector.enable();
    };
    CoinbaseWalletConnect.prototype.eventSubscriber = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.connector.on('accountsChanged', function (address) {
                if (address.length) {
                    observer.next({
                        address: address[0],
                        network: helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[+_this.chainID]],
                        name: 'accountsChanged'
                    });
                }
                else {
                    observer.error({
                        code: 3,
                        message: {
                            title: 'Error',
                            subtitle: 'Authorized error',
                            text: 'You are not authorized.'
                        }
                    });
                }
            });
        });
    };
    CoinbaseWalletConnect.prototype.getChainId = function () {
        return this.connector.request({ method: 'eth_chainId' });
    };
    CoinbaseWalletConnect.prototype.checkNet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentChain, err_1, err_2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.getChainId()];
                    case 1:
                        currentChain = _a.sent();
                        if (!(this.chainID !== parseInt(currentChain))) return [3 /*break*/, 9];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 9]);
                        return [4 /*yield*/, this.connector.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: "0x" + this.chainID.toString(16) }]
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 4:
                        err_1 = _a.sent();
                        if (!(err_1.code === 4902)) return [3 /*break*/, 8];
                        if (!this.chainName || !this.nativeCurrency || !this.rpc || !this.blockExplorerUrl) {
                            return [2 /*return*/, true];
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, this.connector.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: "0x" + this.chainID.toString(16),
                                        chainName: this.chainName,
                                        nativeCurrency: this.nativeCurrency,
                                        rpcUrls: [this.rpc],
                                        blockExplorerUrls: [this.blockExplorerUrl]
                                    },
                                ]
                            })];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 7:
                        err_2 = _a.sent();
                        throw new Error('user reject add chain');
                    case 8: throw new Error("user reject switch network");
                    case 9: return [2 /*return*/, true];
                    case 10:
                        err_3 = _a.sent();
                        throw new Error(err_3);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get account address and chain information from Coinbase Wallet extention.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    CoinbaseWalletConnect.prototype.getAccounts = function () {
        var _this = this;
        var error = {
            code: 3,
            message: {
                title: 'Error',
                subtitle: 'Authorized error',
                message: 'You are not authorized.'
            }
        };
        return new Promise(function (resolve, reject) {
            _this.checkNet()
                .then(function () {
                _this.ethRequestAccounts()
                    .then(function (accounts) {
                    if (accounts[0]) {
                        _this.connector
                            .request({
                            method: 'eth_chainId'
                        })
                            .then(function (chainID) {
                            resolve({
                                address: accounts[0],
                                network: helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[+chainID]]
                            });
                        });
                    }
                    else {
                        reject(error);
                    }
                })["catch"](function () {
                    reject({
                        code: 3,
                        message: {
                            title: 'Error',
                            subtitle: 'User rejected the request',
                            message: 'User rejected the connect'
                        }
                    });
                });
            })["catch"](function (err) {
                error.code = 4;
                error.message = err.message;
                reject(error);
            });
        });
    };
    return CoinbaseWalletConnect;
}(abstract_connector_1.AbstractConnector));
exports.CoinbaseWalletConnect = CoinbaseWalletConnect;
