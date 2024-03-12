import { Observable } from 'rxjs';
import { IConnectorMessage, IProvider, IEvent, IEventError } from '../interface';
import { AbstractConnector } from '../abstract-connector';
export declare class WalletsConnect extends AbstractConnector {
    connector: any;
    /**
     * Connect wallet to application using connect wallet via WalletConnect by scanning Qr Code
     * in your favourite cryptowallet.
     */
    constructor();
    /**
     * Connect WalletConnect to application. Create connection with connect wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    connect(provider: IProvider): Promise<IConnectorMessage>;
    /**
   * Disconnect from  WalletConnect to application. This method aborts the connection with the wallet and returns a Promise that resolves to void.
   * This method acts as a placeholder to meet the requirements of an abstract class or to customize the functionality for the current connector.
   *
   * @returns {Promise<void>} A Promise that resolves when the disconnection is complete.
   * @example this.disconnect().then((res) => console.log(res),(err) => console.log(err));
   */
    disconnect(): Promise<void>;
    eventSubscriber(): Observable<IEvent | IEventError>;
    /**
     * Get account address and chain information from connected wallet.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    getAccounts(): Promise<any>;
}
