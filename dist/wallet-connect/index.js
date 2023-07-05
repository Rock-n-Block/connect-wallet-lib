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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.WalletsConnect = void 0;
var rxjs_1 = require("rxjs");
var ethereum_provider_1 = require("@walletconnect/ethereum-provider");
var helpers_1 = require("../helpers");
var abstract_connector_1 = require("../abstract-connector");
var WalletsConnect = /** @class */ (function (_super) {
    __extends(WalletsConnect, _super);
    /**
     * Connect wallet to application using connect wallet via WalletConnect by scanning Qr Code
     * in your favourite cryptowallet.
     */
    function WalletsConnect() {
        return _super.call(this) || this;
    }
    /**
     * Connect WalletConnect to application. Create connection with connect wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    WalletsConnect.prototype.connect = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, result;
                        var _this = this;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _a = this;
                                    return [4 /*yield*/, ethereum_provider_1.EthereumProvider.init(__assign({}, provider.provider[provider.useProvider].wcConfig))];
                                case 1:
                                    _a.connector = _c.sent();
                                    if (!((_b = this.connector.session) === null || _b === void 0 ? void 0 : _b.topic)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.connector.disconnect({
                                            topic: this.connector.session.topic
                                        })];
                                case 2:
                                    _c.sent();
                                    _c.label = 3;
                                case 3:
                                    console.log('this.connector', this.connector);
                                    return [4 /*yield*/, this.connector
                                            .connect(__assign({}, provider.provider[provider.useProvider].wcConfig))
                                            .then(function (provider) {
                                            console.log("Wallet Connect V2 connected.");
                                            console.log('provider', provider);
                                            resolve({
                                                code: 1,
                                                connected: true,
                                                provider: _this.connector,
                                                message: {
                                                    title: 'Success',
                                                    subtitle: 'Wallet Connect',
                                                    text: "Wallet Connect connected."
                                                }
                                            });
                                        })["catch"](function () {
                                            reject({
                                                code: 5,
                                                connected: false,
                                                message: {
                                                    title: 'Error',
                                                    subtitle: 'Error connect',
                                                    text: "User closed qr modal window."
                                                }
                                            });
                                        })];
                                case 4:
                                    result = _c.sent();
                                    console.log('result', result);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    WalletsConnect.prototype.eventSubscriber = function () {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            _this.connector.on('connect', function (error, payload) {
                if (error) {
                    observer.error({
                        code: 3,
                        message: {
                            title: 'Error',
                            subtitle: 'Authorized error',
                            message: 'You are not authorized.'
                        }
                    });
                }
                var _a = payload.params[0], accounts = _a.accounts, chainId = _a.chainId;
                observer.next({ address: accounts, network: chainId, name: 'connect' });
            });
            _this.connector.on('disconnect', function (error) {
                if (error) {
                    console.log('wallet connect on connect error', error, error.data);
                    observer.error({
                        code: 6,
                        message: {
                            title: 'Error',
                            subtitle: 'Disconnect',
                            message: 'Wallet disconnected'
                        }
                    });
                }
            });
            _this.connector.on('accountsChanged', function (accounts) {
                console.log('WalletConnect account changed', accounts, accounts);
                observer.next({
                    address: accounts[0],
                    network: helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[_this.connector.chainId]],
                    name: 'accountsChanged'
                });
            });
            _this.connector.on('chainChanged', function (chainId) {
                console.log('WalletConnect chain changed:', chainId);
            });
            _this.connector.on('display_uri', function (displayUri) {
                console.log('WalletConnect display_uri:', displayUri);
            });
            _this.connector.on('wc_sessionUpdate', function (error, payload) {
                console.log(error || payload, 'wc_sessionUpdate');
            });
            _this.connector.on('wc_sessionRequest', function (error, payload) {
                console.log(error || payload, 'wc_sessionRequest');
            });
            _this.connector.on('call_request', function (error, payload) {
                console.log(error || payload, 'call_request');
            });
            _this.connector.on('session_update', function (error, payload) {
                console.log(error || payload, 'session_update');
            });
            _this.connector.on('session_event', function (error, payload) {
                console.log(error || payload, 'session_event');
            });
            _this.connector.on('session_request', function (error, payload) {
                console.log(error || payload, 'session_request');
            });
        });
    };
    /**
     * Get account address and chain information from connected wallet.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    WalletsConnect.prototype.getAccounts = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (!_this.connector.connected) {
                _this.connector.enable();
            }
            resolve({
                address: _this.connector.accounts[0],
                network: helpers_1.parameters.chainsMap[helpers_1.parameters.chainIDMap[_this.connector.chainId]]
            });
        });
    };
    return WalletsConnect;
}(abstract_connector_1.AbstractConnector));
exports.WalletsConnect = WalletsConnect;
