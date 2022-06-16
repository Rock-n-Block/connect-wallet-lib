import { Observable } from "rxjs";
import WalletConnectProvider from "@walletconnect/web3-provider";

const initialProviderConfig: IWalletConnectProviderOptions = {
  useProvider: "rpc",
  provider: {
    rpc: {},
    bridge: "",
    infuraId: "",
  },
};

import {
  IConnectorMessage,
  IProvider,
  IEvent,
  IEventError,
  IWalletConnectProviderOptions,
  INetwork,
  ICheckNet,
} from "../interface";
import { parameters } from "../helpers";
import { AbstractConnector } from "../abstract-connector";
import { chainError } from "../errors";

export class WalletsConnect implements AbstractConnector {
  public connector: WalletConnectProvider;
  public name: string = "WalletConnect";
  private chainID: number;

  /**
   * Connect wallet to application using connect wallet via WalletConnect by scanning Qr Code
   * in your favourite crypto wallet.
   */
  constructor(network: INetwork) {
    this.chainID = network.chainID;
  }

  private getChainId(): Promise<any> {
    return this.connector.request({ method: "eth_chainId" });
  }

  private async checkNet() {
    const { chainsMap, chainIDMap } = parameters;
    const result: ICheckNet = {
      chain: true,
    };
    try {
      const currentChain = await this.getChainId();
      if (this.chainID !== parseInt(currentChain)) {
        result.chain = false;
        result.error = chainError(
          `Please set network: ${chainsMap[chainIDMap[this.chainID]].name}.`
        );
        return result;
      }
      return result;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Connect WalletConnect to application. Create connection with connect wallet and return provider for Web3.
   *
   * @returns return connect status and connect information with provider for Web3.
   * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
   */
  public async connect(
    provider: IProvider,
    network: INetwork
  ): Promise<IConnectorMessage> {
    return new Promise<any>(async (resolve, reject) => {
      // set rpc config from network data
      const providerConfig = { ...initialProviderConfig, ...provider };
      const isProviderRpcEmpty = !provider.provider;
      if (providerConfig.useProvider === "rpc" && isProviderRpcEmpty) {
        providerConfig.provider.rpc = { [network.chainID]: network.rpc };
      }

      this.connector = new WalletConnectProvider({
        [providerConfig.useProvider]:
          providerConfig.provider[providerConfig.useProvider],
      });

      await this.connector
        .enable()
        .then(() => {
          resolve({
            code: 1,
            connected: true,
            provider: this.connector,
            message: {
              title: "Success",
              subtitle: "Wallet Connect",
              text: `Wallet Connect connected.`,
            },
          });
        })
        .catch((err) => {
          reject({
            code: 5,
            connected: false,
            message: {
              title: "Error",
              subtitle: "Error connect",
              text: `User closed qr modal window.`,
            },
          });
        });
    });
  }

  public eventSubscriber(): Observable<IEvent | IEventError> {
    return new Observable((observer) => {
      this.connector.on("connect", (error: any, payload: any) => {
        if (error) {
          observer.error({
            code: 3,
            message: {
              title: "Error",
              subtitle: "Authorized error",
              message: "You are not authorized.",
            },
          });
        }

        const { accounts, chainId } = payload.params[0];

        observer.next({ address: accounts, network: chainId, name: "connect" });
      });

      this.connector.on("disconnect", (error, payload) => {
        if (error) {
          console.log("wallet connect on connect error", error, payload);
          observer.error({
            code: 6,
            message: {
              title: "Error",
              subtitle: "Disconnect",
              message: "Wallet disconnected",
            },
          });
        }
      });

      this.connector.on(
        "accountsChanged",
        (accounts: string[], payload: any) => {
          console.log("WalletConnect account changed", accounts, payload);

          observer.next({
            address: accounts[0],
            network:
              parameters.chainsMap[
                parameters.chainIDMap[this.connector.chainId]
              ],
            name: "accountsChanged",
          });
        }
      );

      this.connector.on("chainChanged", (chainId: number) => {
        console.log("WalletConnect chain changed:", chainId);
        observer.next({
          name: 'chainChanged',
          network: parameters.chainsMap[
            parameters.chainIDMap[chainId]
          ],
          address: ''
        })
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
    return new Promise((resolve, reject) => {
      this.checkNet().then((netStatus) => {
        if (netStatus.chain) {
          if (!this.connector.connected) {
            this.connector.createSessithis.connector.on();
          }

          resolve({
            address: this.connector.accounts[0],
            network:
              parameters.chainsMap[
                parameters.chainIDMap[this.connector.chainId]
              ],
          });
        } else {
          reject(netStatus.error);
        }
      });
    });
  }

  public disconnect(): Promise<void> {
    return this.connector.disconnect();
  }
}
