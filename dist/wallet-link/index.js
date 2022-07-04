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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.WalletLinkConnect = void 0;
var rxjs_1 = require("rxjs");
var walletlink_1 = __importDefault(require("walletlink"));
var helpers_1 = require("../helpers");
var abstract_connector_1 = require("../abstract-connector");
var WalletLinkConnect = /** @class */ (function (_super) {
    __extends(WalletLinkConnect, _super);
    /**
     * WalletLinkConnect class to connect browser Coinbase Wallet extention to your application
     * using connect wallet.
     */
    function WalletLinkConnect(network) {
        var _this = _super.call(this) || this;
        _this.chainID = network.chainID;
        return _this;
    }
    /**
     * Connect Coinbase Wallet browser. Create connection with connect
     * wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    WalletLinkConnect.prototype.connect = function (provider) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof window.ethereum && window.ethereum.isWalletLink === true) {
                _this.connector = window.ethereum;
                resolve({
                    code: 1,
                    connected: true,
                    provider: _this.connector,
                    message: {
                        title: 'Success',
                        subtitle: 'Connect success',
                        text: "WalletLink found and connected."
                    }
                });
            }
            else {
                var walletLink = new walletlink_1["default"]({
                    darkMode: false,
                    appName: '123',
                    overrideIsMetaMask: true
                });
                var chain = helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[_this.chainID]];
                _this.connector = walletLink.makeWeb3Provider("https://" + chain.name + ".infura.io/v3/" + provider.provider.infura.infuraId, _this.chainID);
                resolve({
                    code: 1,
                    connected: true,
                    provider: _this.connector,
                    message: {
                        title: 'Success',
                        subtitle: 'WalletLink Connect',
                        text: "WalletLink found and connected."
                    }
                });
            }
            reject({
                code: 2,
                connected: false,
                message: {
                    title: 'Error',
                    subtitle: 'Error connect',
                    text: "WalletLink not found, please install it from <a href='https://metamask.io/' target=\"_blank\">metamask.io</a>."
                }
            });
        });
    };
    WalletLinkConnect.prototype.ethRequestAccounts = function () {
        return this.connector.enable();
    };
    WalletLinkConnect.prototype.eventSubscriber = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            // this.connector.on('chainChanged', async (chainId: string) => {
            //   const accounts = await this.ethRequestAccounts();
            //   onNext(observer, {
            //     address: accounts[0],
            //     network: parameters.chainsMap[parameters.chainIDMap[+chainId]],
            //   });
            // });
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
    /**
     * Get account address and chain information from Coinbase Wallet extention.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    WalletLinkConnect.prototype.getAccounts = function () {
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
            if (_this.connector) {
                _this.ethRequestAccounts().then(function (accounts) {
                    if (accounts[0]) {
                        _this.connector
                            .request({
                            method: 'net_version'
                        })
                            .then(function (chainID) {
                            _this.chainID = +chainID;
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
                    }
                }, function (err) {
                    console.log(err);
                });
            }
        });
    };
    return WalletLinkConnect;
}(abstract_connector_1.AbstractConnector));
exports.WalletLinkConnect = WalletLinkConnect;
