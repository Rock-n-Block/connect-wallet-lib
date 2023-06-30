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
  public connector: WalletConnectProvider;

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
        projectId: provider.provider[provider.useProvider].projectId,
        chains: provider.provider[provider.useProvider].chains,
        showQrModal: provider.provider[provider.useProvider].showQrModal,
      });
      await this.connector
        .connect()
        .then((provider) => {
          resolve({
            code: 1,
            connected: true,
            provider,
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
    });
  }

  public eventSubscriber(): Observable<IEvent | IEventError> {
    console.log('eventSubscriber');
    return new Observable((observer) => {
      console.log('observer', observer);
      console.log('this.connector', this.connector);
      this.connector.on('connect', (payload: any) => {
        console.log('payload', payload);
        if (payload.error) {
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
        console.log('error', error);

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
        console.log('accounts', accounts);
        console.log('WalletConnect account changed', accounts, accounts);

        observer.next({
          address: accounts[0],
          network:
            parameters.chainsMap[
              parameters.chainIDMap[this.connector.chainId]
            ],
          name: 'accountsChanged',
        });
      });

      this.connector.on('chainChanged', (chainId: any) => {
        console.log('WalletConnect chain changed:', chainId);
      });

      // this.connector.on('wc_sessionUpdate', (error, payload) => {
      //   console.log(error || payload, 'wc_sessionUpdate');
      // });

      // this.connector.on('wc_sessionRequest', (error, payload) => {
      //   console.log(error || payload, 'wc_sessionRequest');
      // });

      // this.connector.on('call_request', (error, payload) => {
      //   console.log(error || payload, 'call_request');
      // });

      // this.connector.on('session_update', (error, payload) => {
      //   console.log(error || payload, 'session_update');
      // });

      // this.connector.on('session_request', (error, payload) => {
      //   console.log(error || payload, 'session_request');
      // });
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
      console.log('this.connector', this.connector);
      if (!this.connector.connected) {
        this.connector.enable();
      }

      resolve({
        address: this.connector.accounts[0],
        network:
          parameters.chainsMap[parameters.chainIDMap[this.connector.chainId]],
      });
    });
  }
}
