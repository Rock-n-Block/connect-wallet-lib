"use strict";
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
exports.ConnectWallet = void 0;
var web3_1 = __importDefault(require("web3"));
var rxjs_1 = require("rxjs");
var helpers_1 = require("./helpers");
var errors_1 = require("./errors");
var config_1 = require("./config");
var utils_1 = require("./utils");
var chainsMap = helpers_1.parameters.chainsMap, chainIDMap = helpers_1.parameters.chainIDMap;
var ConnectWallet = /** @class */ (function () {
    /**
     * Connect provider to web3 and get access to web3 methods, account address and transaction in blockchain.
     */
    function ConnectWallet(initProvider) {
        var _this = this;
        this.connectors = [];
        this.contracts = {};
        this.allTxSubscribers = [];
        /**
         *
         * @param {AbstractConstructor[]} wallets - array of wallets which should be add into the wallet lib
         * @return {ConnectWallet} return instance of the class
         * @example new ConnectWallet().use([MetaMask, WalletsConnect])
         */
        this.use = function (wallets) {
            _this.connectors = wallets;
            return _this;
        };
        /**
         * Add custom chains to Connect Wallet, provide an array of chains than return chain list parameters.
         *
         * @returns return chains list parameters
         * @example this.addChains([chain,chain]).then((parameters: any) => console.log(parameters),(err) => console.log(err));
         */
        this.addChains = function (chains) { return (0, helpers_1.addChains)(chains); };
        /**
         * Get contract by providing contract name. If you don't have contracts use addContract function to initialize it.
         *
         * @param {string} name contract name.
         * @returns return contract parameters and methods.
         * @example connectWallet.Contract(ContractName);
         */
        this.Contract = function (name) { return _this.contracts[name]; };
        /**
         * Get access to use Web3. Return Web3 variable to use it methods and parameters.
         *
         * @returns return Web3
         * @example connectWallet.currentWeb3();
         */
        this.currentWeb3 = function () { return _this.Web3; };
        /**
         * Get account balance from ethereum blockchain. Provide address in function arguments to receive address balance
         * from blockchain.
         *
         * @param {string} address address.
         * @returns return address balance.
         * @example connectWallet.getBalance(address).then((balance: string)=> {console.log(balance)});
         */
        this.getBalance = function (address) {
            return _this.Web3.eth.getBalance(address);
        };
        /**
         * Logout function. Use this function if you want to do logout from your application. Function will reset
         * current connection to default then you need to initialize connect() function again to connect to your
         * provider.
         *
         * @example connectWallet.resetConnect();
         */
        this.resetConnect = function () {
            _this.connector.disconnect();
            _this.connector = undefined;
        };
        /**
         * Use this method to sign custom message.
         *
         * @example connectWallet.signMsg('0x0000000000000000000', 'some_data').then(data => console.log('sign:', data),err => console.log('sign err:',err));
         */
        this.signMsg = function (userAddr, msg) {
            return _this.Web3.eth.personal.sign(msg, userAddr, "");
        };
        if (initProvider) {
            this.Web3 = new web3_1["default"](initProvider);
        }
    }
    /**
     * Create new wallet provider with network and settings values by passing it in function arguments.
     *
     * @param {IProvider} provider provider data with provider name and setting.
     * @param {INetwork} network application working network name and chainID.
     * @param {ISettings} settings connect wallet settings.
     * @param {IKeys} [keys] keys which will be used in the process (for example `infuraId`)
     * @returns return connection info in boolean (true - connected, false - not connected) or error provider.
     * @example connectWallet.connect(providerWallet, networkWallet, connectSetting).then((connect) =>
     * {console.log(connect);},(error) => {console.log('connect error', error);});
     */
    ConnectWallet.prototype.connect = function (provider, network, settings, keys) {
        return __awaiter(this, void 0, void 0, function () {
            var networkConfig;
            var _this = this;
            return __generator(this, function (_a) {
                networkConfig = (0, utils_1.normalizeNetworkConfig)(network, keys);
                // simple network config validation (check existing of config fields)
                if (!(0, utils_1.isConfigSufficient)(networkConfig).valid) {
                    return [2 /*return*/, (0, errors_1.invalidConfig)(provider)];
                }
                // check providers
                if (this.connectors.every(function (connector) { return new connector(networkConfig).name !== provider.name; })) {
                    return [2 /*return*/, (0, errors_1.providerError)(provider)];
                }
                this.network = networkConfig;
                this.settings = settings ? settings : config_1.initialSettings;
                this.connector = this.chooseProvider(provider.name);
                return [2 /*return*/, this.connector
                        .connect(provider, networkConfig)
                        .then(function (connect) {
                        return _this.applySettings(connect);
                    })
                        .then(function (connect) {
                        if (connect.connected) {
                            _this.initWeb3(connect.provider === "Web3" ? web3_1["default"].givenProvider : connect.provider);
                        }
                        else {
                            var chainID = _this.network.chainID;
                            return _this.applySettings((0, errors_1.chainError)("Please set network: ".concat(chainsMap[chainIDMap[chainID]].name, ".")));
                        }
                        return connect;
                    })["catch"](function (error) {
                        return _this.applySettings(error);
                    })];
            });
        });
    };
    /**
     * Find and choose available provider for create connection.
     *
     * @param {string} name provider name passing from connect function in provider value.
     * @returns return selected provider class.
     * @example connectWallet.chooseProvider('MetaMask'); //=> new MetamaskConnect()
     */
    ConnectWallet.prototype.chooseProvider = function (name) {
        var _this = this;
        this.providerName = name;
        var provider = this.connectors.find(function (connector) { return new connector(_this.network).name === name; });
        return new provider(this.network);
    };
    /**
     * Initialize a Web3 by set provider after using connect function.
     *
     * @param {any} provider array with provider information.
     * @example connectWallet.initWeb3(provider);
     */
    ConnectWallet.prototype.initWeb3 = function (provider) {
        if (this.Web3) {
            this.Web3.setProvider(provider);
        }
        else {
            this.Web3 = new web3_1["default"](provider);
        }
    };
    /**
     * Getting current connector
     *
     * @example connectWallet.getConnector();
     */
    ConnectWallet.prototype.getConnector = function () {
        return this.connector;
    };
    /**
     * Getting current providerName
     *
     * @example connectWallet.getProviderName();
     */
    ConnectWallet.prototype.getProviderName = function () {
        return this.providerName;
    };
    /**
     * Add settings parameters to connect wallet answers.
     *
     * @param {Array} data array which needs to apply a settings parameters
     * @returns return complete data with settings parameters
     * @example connectWallet.applySettings(data); //=> data.type etc.
     */
    ConnectWallet.prototype.applySettings = function (data) {
        if (this.settings.providerType) {
            data.type = this.providerName;
        }
        return data;
    };
    /**
     * Get account address and chain information from selected wallet provider.
     *
     * @returns return an Promise array with data error or connected.
     * @example connectWallet.getAccounts().then((account: any)=> console.log('account',account),(err: any => console.log('account', err)));
     */
    ConnectWallet.prototype.getAccounts = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.currentWeb3() && !_this.connector) {
                var _a = _this.currentWeb3().currentProvider, address = _a.address, accounts = _a.accounts;
                var connectObject = {
                    address: address || accounts[0],
                    network: {
                        name: _this.network.chainName,
                        chainID: _this.network.chainID
                    }
                };
                resolve(connectObject);
            }
            else if (_this.connector) {
                var chainID_1 = _this.network.chainID;
                _this.connector
                    .getAccounts()
                    .then(function (connectInfo) {
                    if (connectInfo.network.chainID !== chainID_1) {
                        reject(_this.applySettings((0, errors_1.chainError)("Please set network: ".concat(chainsMap[chainIDMap[chainID_1]].name, "."))));
                    }
                    else {
                        resolve(_this.applySettings(connectInfo));
                    }
                })["catch"](function (error) {
                    reject(_this.applySettings(error));
                });
            }
            else {
                reject(_this.applySettings((0, errors_1.gettingAddressError)()));
            }
        });
    };
    /**
     * Create new Observer of transactions and add it to array of all transaction subscribers
     * variable. You can subscribe to waiting answer from blockchain if your transaction
     * finished success or not. You will get transaction hash.
     *
     * @returns return new observable value.
     * @example connectWallet.txSubscribe().subscribe((tx) => {console.log('transaction', tx)});
     */
    ConnectWallet.prototype.txSubscribe = function () {
        var _this = this;
        var newObserver = new rxjs_1.Observable(function (observer) {
            _this.allTxSubscribers.push(observer);
        });
        return newObserver;
    };
    /**
     * Trigger all transaction subscribers and pass transaction hash if transaction complete.
     *
     * @param {string} txHash transaction hash of success transaction.
     * @example connectWallet.clTxSubscribers(txHash);
     */
    ConnectWallet.prototype.clTxSubscribers = function (txHash) {
        this.allTxSubscribers.forEach(function (observer) {
            observer.next(txHash);
        });
    };
    /**
     * Checking transaction hash status in blockchain. And return transaction hash if transaction
     * was found and success or reject null if don't have enough data or information.
     *
     * @param {string} txHash transaction hash.
     * @param {any} resolve resolve transaction hash.
     * @param {any} reject reject if transaction not found.
     * @returns return transaction hash or reject with null.
     * @example new Promise((resolve, reject) => {connectWallet.checkTx(txHash, resolve, reject);});
     */
    ConnectWallet.prototype.txStatus = function (txHash, resolve, reject) {
        var _this = this;
        this.Web3.eth.getTransactionReceipt(txHash, function (err, res) {
            if (err || (res && res.blockNumber && !res.status)) {
                reject(err);
            }
            else if (res && res.blockNumber) {
                _this.clTxSubscribers(txHash);
                resolve(res);
            }
            else if (!res) {
                setTimeout(function () {
                    _this.txStatus(txHash, resolve, reject);
                }, 2000);
            }
        });
    };
    /**
     * Transaction check in blockchain. Use this function to start check transaction by his hash.
     * This function will triggered all transaction subscribers when transaction complete successful or
     * with errors. You need to provide transaction hash in function after you approve it.
     *
     * @param {string} txHash transaction hash.
     * @returns return promise with transaction search info, can return transaction hash or null.
     * @example connectWallet.txCheck(txHash).then((txHash: string) => console.log(txHash),(err) => console.log(err));
     */
    ConnectWallet.prototype.txCheck = function (txHash) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.txStatus(txHash, resolve, reject);
        });
    };
    /**
     * Add contract to Web3 without providing contract name to initialize it, then you will
     * able to use contract function to get contract from web3 and use contract methods.
     *
     * @param {INoNameContract} contract contract object with contract address and abi.
     * @returns return contract web3 methods.
     * @example connectWallet.getContract(contract);
     */
    ConnectWallet.prototype.getContract = function (contract) {
        return new this.Web3.eth.Contract(contract.abi, contract.address);
    };
    /**
     * Add contract to Web3. Provide contract name, address and abi code to initialize it, then you will
     * able to use contract(name) function to get contract from web3 and use contract methods.
     *
     * @param {IAddContract} contract contract object with contract name, address and abi.
     * @returns return true if contact added successfully or false if have some errors.
     * @example connectWallet.addContract(contract).then((contractStatus: boolean) => console.log(contractStatus), (err) => console.log(err));
     */
    ConnectWallet.prototype.addContract = function (contract) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.contracts[contract.name] = new _this.Web3.eth.Contract(contract.abi, contract.address);
                resolve(true);
            }
            catch (_a) {
                reject(false);
            }
        });
    };
    /**
     * Subscribe to events from current connection: connect, disconnect, chain change, account change and etc.
     *
     * @example connectWallet.eventSubscriber().subscribe((event:IEvent) => console.log('event from subscribe', event), (err:IEventError) => console.log('event error', err));
     */
    ConnectWallet.prototype.eventSubscriber = function () {
        var _this = this;
        if (!this.connector) {
            throw new Error("connector haven't initialized");
        }
        return new rxjs_1.Observable(function (observer) {
            _this.connector.eventSubscriber().subscribe(function (event) { return observer.next(event); }, function (error) { return observer.error(error); });
        });
    };
    return ConnectWallet;
}());
exports.ConnectWallet = ConnectWallet;
