import Web3 from 'web3';
import { Observable } from 'rxjs';
import { Contract } from 'web3-eth-contract';
import { provider } from 'web3-core';
import { MetamaskConnect } from './metamask';
import { WalletsConnect } from './wallet-connect';
import { CoinbaseWalletConnect } from './coinbase-wallet';
import { KardiaChainConnect } from './kardiachain';
import { OntoConnect } from './onto';
import { INetwork, IProvider, IAddContract, IConnect, ISettings, IError, IConnectorMessage, ContractWeb3, IChain, INoNameContract, IEvent, IEventError } from './interface';
export declare class ConnectWallet {
    private connector;
    private providerName;
    private availableProviders;
    private network;
    private settings;
    Web3: Web3;
    private contracts;
    private allTxSubscribers;
    /**
     * Connect provider to web3 and get access to web3 methods, account address and transaction in blockchain.
     * Supported MetaMask, WalletConnect, Kardiachain and CoinBase providers.
     */
    constructor(initProvider?: provider);
    /**
     * Add custom chains to Connect Wallet, provide an array of chains than return chain list parameters.
     *
     * @returns return chains list parameters
     * @example this.addChains([chain,chain]).then((parameters: any) => console.log(parameters),(err) => console.log(err));
     */
    addChains: (chains: IChain[]) => any;
    /**
     * Create new wallet provider with network and settings valuse by passing it in function arguments.
     *
     * @param {IProvider} provider provider data with provider name and setting.
     * @param {INetwork} network application working network name and chainID.
     * @param {ISettings} settings connect wallet settings.
     * @returns return connection info in boolean (true - connected, false - not connected) or error provider.
     * @example connectWallet.connect(providerWallet, networkWallet, connectSetting).then((connect) =>
     * {console.log(connect);},(error) => {console.log('connect error', error);});
     */
    connect(provider: IProvider, network: INetwork, settings?: ISettings): Promise<IConnectorMessage>;
    /**
     * Find and choose available provider for create connection.
     *
     * @param {Srtring} name provider name passing from connect function in provider value.
     * @returns return selected provider class.
     * @example connectWallet.chooseProvider('MetaMask'); //=> new MetamaskConnect()
     */
    private chooseProvider;
    /**
     * Initialize a Web3 by set provider after using connect function.
     *
     * @param {Any} provider array with provider information.
     * @example connectWallet.initWeb3(provider);
     */
    private initWeb3;
    /**
     * Geting current connectror
     *
     * @example connectWallet.getConnector();
     */
    getConnector(): MetamaskConnect | OntoConnect | WalletsConnect | CoinbaseWalletConnect | KardiaChainConnect;
    /**
     * Geting current providerName
     *
     * @example connectWallet.getproviderName();
     */
    getproviderName(): string;
    /**
     * Add settings parameters to connect wallet answers.
     *
     * @param {Array} data array which needs to apply a settings parameters
     * @returns return completedata with settings parameters
     * @example connectWallet.applySettings(data); //=> data.type etc.
     */
    private applySettings;
    /**
     * Get account address and chain information from selected wallet provider.
     *
     * @returns return an Promise array with data error or connected.
     * @example connectWallet.getAccounts().then((account: any)=> console.log('account',account),(err: any => console.log('account', err)));
     */
    getAccounts(): Promise<IConnect | IError | {
        address: string;
    }>;
    /**
     * Create new Observer of transactions and add it to array of all transaction subscribers
     * variable. You can subscribe to waiting answer from blockchain if your trunsaction
     * finshed success or not. You will get transaction hash.
     *
     * @returns return new observable value.
     * @example connectWallet.txSubscribe().subscribe((tx) => {console.log('transacton', tx)});
     */
    txSubscribe(): Observable<any>;
    /**
     * Trigger all transaction subscribers and pass transaction hash if transaction complete.
     *
     * @param {String} txHash transaction hash of success transaction.
     * @example connectWallet.clTxSubscribers(txHash);
     */
    clTxSubscribers(txHash: string): void;
    /**
     * Checking transaction hash status in blockchain. And return transacrion hash if transaction
     * was found and success or reject null if dont have enouth data or information.
     *
     * @param {String} txHash transaction hash.
     * @param {Any} resolve resolve transaction hash.
     * @param {Any} reject reject if transaction not found.
     * @returns return transaction hash or reject with null.
     * @example new Promise((resolve, reject) => {connectWallet.checkTx(txHash, resolve, reject);});
     */
    private txStatus;
    /**
     * Transaction check in blockchain. Use this funnction to start check transaction by his hash.
     * This function will triggered all transaction subscribers when transaction complete successful or
     * with errors. You need to provide transaction hash in function after you approve it.
     *
     * @param {String} txHash transaction hash.
     * @returns return promise with transaction search info, can return transaction hash or null.
     * @example connectWallet.txCheck(txHash).then((txHash: string) => console.log(txHash),(err) => console.log(err));
     */
    txCheck(txHash: string): Promise<any>;
    /**
     * Add contract to Web3 without providing contract name to initialize it, then you will
     * able to use contract function to get contract from web3 and use contract methods.
     *
     * @param {INoNameContract} contract contract object with contract address and abi.
     * @returns return contract web3 methods.
     * @example connectWallet.getContract(contract);
     */
    getContract(contract: INoNameContract): Contract;
    /**
     * Add contract to Web3. Provide contract name, address and abi code to initialize it, then you will
     * able to use contract(name) function to get contract from web3 and use contract methods.
     *
     * @param {IAddContract} contract contract object with contract name, address and abi.
     * @returns return true if contact added successfully or false if have some errors.
     * @example connectWallet.addContract(contract).then((contractStatus: boolean) => console.log(contractStatus), (err) => console.log(err));
     */
    addContract(contract: IAddContract): Promise<boolean>;
    /**
     * Get contract by providing contract name. If you don't have contracts use addContract function to initialize it.
     *
     * @param {String} name contract name.
     * @returns return contract parameters and methods.
     * @example connectWallet.Contract(ContractName);
     */
    Contract: (name: string) => ContractWeb3;
    /**
     * Get access to use Web3. Return Web3 variable to use it methods and parameters.
     *
     * @returns return Web3
     * @example connectWallet.currentWeb3();
     */
    currentWeb3: () => Web3;
    /**
     * Get account balance from ethereum blockchain. Provide address in function arguments to recive address balance
     * from blockchain.
     *
     * @param {String} address address.
     * @returns return address balance.
     * @example connectWallet.getBalance(address).then((balance: string)=> {console.log(balance)});
     */
    getBalance: (address: string) => Promise<string | number>;
    /**
     * Logout function. Use this function if you want to do logout from your application. Function will reset
     * current connection to defoult then you need to initialize connect() function again to connect to your
     * provider.
     *
     * @example connectWallet.resetConect();
     */
    resetConect: () => void;
    /**
     * Use this method to sign custom mesaage.
     *
     * @example connectWallet.signMsg('0x0000000000000000000', 'some_data').then(data => console.log('sign:', data),err => console.log('sign err:',err));
     */
    signMsg: (userAddr: string, msg: string) => Promise<any>;
    /**
     * Subscribe to events from current connection: connect, disconnect, chain change, account change and etc.
     *
     * @example connectWallet.eventSubscriber().subscribe((event:IEvent) => console.log('event from subscribe', event), (err:IEventError) => console.log('event error', err));
     */
    eventSubscriber(): Observable<IEvent | IEventError>;
}
