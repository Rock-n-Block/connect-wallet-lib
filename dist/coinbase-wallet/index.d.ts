import { Observable } from 'rxjs';
import { IConnectorMessage, IProvider, INetwork, IEvent, IEventError } from '../interface';
import { AbstractConnector } from '../abstract-connector';
export declare class CoinbaseWalletConnect extends AbstractConnector {
    connector: any;
    private chainID;
    private chainName;
    private nativeCurrency;
    private rpc;
    private blockExplorerUrl;
    /**
     * CoinbaseWalletConnect class to connect browser Coinbase Wallet extention to your application
     * using connect wallet.
     */
    constructor(network: INetwork);
    /**
     * Connect Coinbase Wallet browser. Create connection with connect
     * wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    connect(provider: IProvider): Promise<IConnectorMessage>;
    private ethRequestAccounts;
    eventSubscriber(): Observable<IEvent | IEventError>;
    private getChainId;
    private checkNet;
    /**
     * Get account address and chain information from Coinbase Wallet extention.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    getAccounts(): Promise<any>;
}
