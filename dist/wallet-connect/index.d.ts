import { Observable } from 'rxjs';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { IConnectorMessage, IProvider, IEvent, IEventError } from '../interface';
import { AbstractConnector } from '../abstract-connector';
export declare class WalletsConnect extends AbstractConnector {
    connector: WalletConnectProvider;
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
    eventSubscriber(): Observable<IEvent | IEventError>;
    /**
     * Get account address and chain information from connected wallet.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    getAccounts(): Promise<any>;
}
