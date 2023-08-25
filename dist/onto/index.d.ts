import { Observable } from 'rxjs';
import { IConnectorMessage, INetwork, IEvent, IEventError } from '../interface';
import { AbstractConnector } from '../abstract-connector';
export declare class OntoConnect extends AbstractConnector {
    connector: any;
    private chainID;
    private chainName;
    private nativeCurrency;
    private rpc;
    private blockExplorerUrl;
    /**
     * Onto class to connect browser metamask extention to your application
     * using connect wallet.
     */
    constructor(network: INetwork);
    /**
     * Connect Onto browser or mobile extention to application. Create connection with connect
     * wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    connect(): Promise<IConnectorMessage>;
    private ethRequestAccounts;
    private getChainId;
    private checkNet;
    eventSubscriber(): Observable<IEvent | IEventError>;
    /**
     * Get account address and chain information from metamask extention.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    getAccounts(): Promise<any>;
}
