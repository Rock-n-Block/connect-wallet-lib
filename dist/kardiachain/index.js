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
exports.__esModule = true;
exports.KardiaChainConnect = void 0;
var rxjs_1 = require("rxjs");
var helpers_1 = require("../helpers");
var abstract_connector_1 = require("../abstract-connector");
var KardiaChainConnect = /** @class */ (function (_super) {
    __extends(KardiaChainConnect, _super);
    /**
     * KardiaChainConnect class to connect browser KardiaChain Wallet extention to your application
     * using connect wallet.
     */
    function KardiaChainConnect() {
        return _super.call(this) || this;
    }
    /**
     * Connect KardiaChain Wallet browser. Create connection with connect
     * wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    KardiaChainConnect.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof window.kardiachain !== 'undefined') {
                _this.connector = window.kardiachain;
                if (window.kardiachain.isKaiWallet) {
                    _this.connector.enable();
                    resolve({
                        code: 1,
                        connected: true,
                        provider: _this.connector,
                        message: {
                            title: 'Success',
                            subtitle: 'Connect success',
                            text: "Kardiachain found and connected."
                        }
                    });
                }
            }
            reject({
                code: 2,
                connected: false,
                message: {
                    title: 'Error',
                    subtitle: 'Error connect',
                    text: "Kardiachain not found, please install it from <a href='https://metamask.io/' target=\"_blank\">metamask.io</a>."
                }
            });
        });
    };
    KardiaChainConnect.prototype.ethRequestAccounts = function () {
        return this.connector.request({ method: 'eth_requestAccounts' });
    };
    KardiaChainConnect.prototype.eventSubscriber = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.connector.on('chainChanged', function (chainId) { return __awaiter(_this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ethRequestAccounts()];
                        case 1:
                            accounts = _a.sent();
                            observer.next({
                                address: accounts[0],
                                network: helpers_1.parameters.chainsMap[chainId],
                                name: 'chainChanged'
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            _this.connector.on('accountsChanged', function (address) {
                if ((_this.currentAddr &&
                    address[0].toUpperCase() !== _this.currentAddr.toUpperCase()) ||
                    address[0].toUpperCase() !==
                        _this.connector.selectedAddress.toUpperCase()) {
                    if (address.length) {
                        _this.connector
                            .request({
                            method: 'eth_chainId'
                        })
                            .then(function (chainID) {
                            _this.currentAddr = address[0];
                            _this.chainID = +chainID;
                            observer.next({
                                address: address[0],
                                network: helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[+chainID]],
                                name: 'accountsChanged'
                            });
                        });
                    }
                    else {
                        observer.error({
                            code: 3,
                            message: {
                                title: 'Error',
                                subtitle: 'Authorized error',
                                message: 'You are not authorized.'
                            }
                        });
                    }
                }
            });
        });
    };
    /**
     * Get account address and chain information from KardiaChain Wallet extention.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    KardiaChainConnect.prototype.getAccounts = function () {
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
            if (_this.connector && _this.connector.isKaiWallet) {
                _this.currentAddr = _this.connector.selectedAddress;
                _this.ethRequestAccounts().then(function (accounts) {
                    if (accounts[0]) {
                        _this.connector
                            .request({
                            method: 'eth_chainId'
                        })
                            .then(function (chainID) {
                            _this.chainID = +chainID;
                            _this.currentAddr = accounts[0];
                            resolve({
                                address: accounts[0],
                                network: helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[+chainID]]
                            });
                        });
                    }
                    else {
                        _this.connector.enable()["catch"](function () {
                            reject(error);
                        });
                        // reject(error);
                    }
                    // if (!accounts[0]) {
                    // this.connector.enable().catch(() => {
                    //   reject(error);
                    // });
                    // } else {
                    //   if (accounts[0]) {
                    //     this.connector
                    //       .request({
                    //         method: 'net_version',
                    //       })
                    //       .then((chainID: string) => {
                    //         this.chainID = +chainID;
                    //         this.currentAddr = accounts[0];
                    //         resolve({
                    //           address: accounts[0],
                    //           network:
                    //             parameters.chainsMap[parameters.chainIDMap[+chainID]],
                    //         });
                    //       });
                    //   } else {
                    //     reject(error);
                    //   }
                    // }
                });
            }
        });
    };
    return KardiaChainConnect;
}(abstract_connector_1.AbstractConnector));
exports.KardiaChainConnect = KardiaChainConnect;
