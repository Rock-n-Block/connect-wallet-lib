import { Observable } from 'rxjs';
import WalletConnectProvider, {
  EthereumProvider,
} from '@walletconnect/ethereum-provider';

import {
  IConnectorMessage,
  IProvider,
  IEvent,
  IEventError,
} from '../interface';
import { parameters } from '../helpers';
import { AbstractConnector } from '../abstract-connector';

export class WalletsConnect extends AbstractConnector {
  public connector: any;

  /**
   * Connect wallet to application using connect wallet via WalletConnect by scanning Qr Code
   * in your favourite cryptowallet.
   */
  constructor() {
    super();
  }

  /**
   * Connect WalletConnect to application. Create connection with connect wallet and return provider for Web3.
   *
   * @returns return connect status and connect information with provider for Web3.
   * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
   */
  public async connect(provider: IProvider): Promise<IConnectorMessage> {
    return new Promise<any>(async (resolve, reject) => {
      this.connector = await EthereumProvider.init({
        ...provider.provider[provider.useProvider].wcConfig,
      });

      // if (this.connector.session?.topic || this.connector.connected) {
      //   await this.connector.disconnect(
      //     this.connector.session?.topic && {
      //       topic: this.connector.session.topic,
      //     }
      //   );
      // }
      await this.connector
        .connect()
        .then(() => {
          console.log(`Wallet Connect V2 connected.`);
          resolve({
            code: 1,
            connected: true,
            provider: this.connector,
            message: {
              title: 'Success',
              subtitle: 'Wallet Connect',
              text: `Wallet Connect connected.`,
            },
          });
        })
        .catch(() => {
          reject({
            code: 5,
            connected: false,
            message: {
              title: 'Error',
              subtitle: 'Error connect',
              text: `User closed qr modal window.`,
            },
          });
        });
      this.connector.on('connect', (error: any, payload: any) => {
        console.log('error', error);
        console.log('payload', payload);
      });
      this.connector.on('display_uri', (displayUri: any) => {
        console.log('WalletConnect display_uri:', displayUri);
      });

      await this.connector.enable();
    });
  }

  public eventSubscriber(): Observable<IEvent | IEventError> {
    return new Observable((observer) => {
      this.connector.on('connect', (error: any, payload: any) => {
        if (error) {
          observer.error({
            code: 3,
            message: {
              title: 'Error',
              subtitle: 'Authorized error',
              message: 'You are not authorized.',
            },
          });
        }

        const { accounts, chainId } = payload.params[0];

        observer.next({ address: accounts, network: chainId, name: 'connect' });
      });

      this.connector.on('disconnect', (error) => {
        if (error) {
          console.log('wallet connect on connect error', error, error.data);
          observer.error({
            code: 6,
            message: {
              title: 'Error',
              subtitle: 'Disconnect',
              message: 'Wallet disconnected',
            },
          });
        }
      });

      this.connector.on('accountsChanged', (accounts: any) => {
        console.log('WalletConnect account changed', accounts, accounts);

        observer.next({
          address: accounts[0],
          network:
            parameters.chainsMap[parameters.chainIDMap[this.connector.chainId]],
          name: 'accountsChanged',
        });
      });

      this.connector.on('chainChanged', (chainId: any) => {
        console.log('WalletConnect chain changed:', chainId);
      });

      this.connector.on('display_uri', (displayUri: any) => {
        console.log('WalletConnect display_uri:', displayUri);
      });

      this.connector.on('wc_sessionUpdate', (error, payload) => {
        console.log(error || payload, 'wc_sessionUpdate');
      });

      this.connector.on('wc_sessionRequest', (error, payload) => {
        console.log(error || payload, 'wc_sessionRequest');
      });

      this.connector.on('call_request', (error, payload) => {
        console.log(error || payload, 'call_request');
      });

      this.connector.on('session_update', (error, payload) => {
        console.log(error || payload, 'session_update');
      });

      this.connector.on('session_event', (error, payload) => {
        console.log(error || payload, 'session_event');
      });

      this.connector.on('session_request', (error, payload) => {
        console.log(error || payload, 'session_request');
      });
    });
  }

  /**
   * Get account address and chain information from connected wallet.
   *
   * @returns return an Observable array with data error or connected information.
   * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
   */
  public getAccounts(): Promise<any> {
    return new Promise((resolve) => {
      if (!this.connector.connected) {
        this.connector.connect();
      }
      resolve({
        address: this.connector.accounts[0],
        network:
          parameters.chainsMap[parameters.chainIDMap[this.connector.chainId]],
      });
    });
  }
}
