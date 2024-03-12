import { Observable } from 'rxjs';
import { IConnectorMessage, IEventError, IEvent } from '../interface';
import { AbstractConnector } from '../abstract-connector';
declare global {
    interface Window {
        kardiachain: any;
    }
}
export declare class KardiaChainConnect extends AbstractConnector {
    connector: any;
    private chainID;
    private currentAddr;
    /**
     * KardiaChainConnect class to connect browser KardiaChain Wallet extention to your application
     * using connect wallet.
     */
    constructor();
    /**
     * Connect KardiaChain Wallet browser. Create connection with connect
     * wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    connect(): Promise<IConnectorMessage>;
    /**
     * Disconnect from the KardiaChain Wallet browser extension. This method aborts the connection with the wallet and returns a Promise that resolves to void.
     * It serves as a placeholder method to fulfill the requirements of an abstract class.
     *
     * @returns {Promise<void>} A Promise that resolves when the disconnection is complete.
     * @example this.disconnect().then((res) => console.log(res),(err) => console.log(err));
     */
    disconnect(): Promise<void>;
    private ethRequestAccounts;
    eventSubscriber(): Observable<IEvent | IEventError>;
    /**
     * Get account address and chain information from KardiaChain Wallet extention.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    getAccounts(): Promise<any>;
}
