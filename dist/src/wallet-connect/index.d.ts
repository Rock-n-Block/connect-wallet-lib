import { Observable } from "rxjs";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IConnectorMessage, IProvider, IEvent, IEventError, INetwork } from "../interface";
import { AbstractConnector } from "../abstract-connector";
export declare class WalletsConnect implements AbstractConnector {
    connector: WalletConnectProvider;
    name: string;
    private chainID;
    /**
     * Connect wallet to application using connect wallet via WalletConnect by scanning Qr Code
     * in your favourite crypto wallet.
     */
    constructor(network: INetwork);
    private getChainId;
    private checkNet;
    /**
     * Connect WalletConnect to application. Create connection with connect wallet and return provider for Web3.
     *
     * @returns return connect status and connect information with provider for Web3.
     * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
     */
    connect(provider: IProvider, network: INetwork): Promise<IConnectorMessage>;
    eventSubscriber(): Observable<IEvent | IEventError>;
    /**
     * Get account address and chain information from connected wallet.
     *
     * @returns return an Observable array with data error or connected information.
     * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
     */
    getAccounts(): Promise<any>;
    disconnect(): Promise<void>;
}
