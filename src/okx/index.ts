import { Observable } from "rxjs";

import {
  IConnectorMessage,
  INetwork,
  INativeCurrency,
  IEvent,
  IEventError,
} from "../interface";
import { parameters, codeMap } from "../helpers";
import { AbstractConnector } from "../abstract-connector";

declare global {
  interface Window {
    okxwallet: any;
  }
}

export class OkxConnect extends AbstractConnector {
  public connector: any;
  private chainID: number;
  private chainName: string;
  private nativeCurrency: INativeCurrency;
  private rpc: string;
  private blockExplorerUrl: string;

  /**
   * Okx class to connect browser okx extention to your application
   * using connect wallet.
   */
  constructor(network: INetwork) {
    super();

    this.chainID = network.chainID;
    if (network.chainName) this.chainName = network.chainName;
    if (network.nativeCurrency) this.nativeCurrency = network.nativeCurrency;
    if (network.rpc) this.rpc = network.rpc;
    if (network.blockExplorerUrl)
      this.blockExplorerUrl = network.blockExplorerUrl;
  }

  /**
   * Connect Okx browser or mobile extention to application. Create connection with connect
   * wallet and return provider for Web3.
   *
   * @returns return connect status and connect information with provider for Web3.
   * @example this.connect().then((connector: IConnectorMessage) => console.log(connector),(err: IConnectorMessage) => console.log(err));
   */
  public connect(): Promise<IConnectorMessage> {
    return new Promise<any>((resolve, reject) => {
      if (typeof window.okxwallet !== "undefined") {
        this.connector = window.okxwallet;
        if (window.okxwallet.isOkxWallet) {
          this.connector.enable();
          resolve({
            code: 1,
            connected: true,
            provider: this.connector,
            message: {
              title: "Success",
              subtitle: "Connect success",
              text: `Okx found and connected.`,
            },
          } as IConnectorMessage);
        }
      }

      reject({
        code: 2,
        connected: false,
        message: {
          title: "Error",
          subtitle: "Error connect",
          text: `Okx not found, please install it from <a href='https://www.okx.com/web3' target="_blank">www.okx.com/web3</a>.`,
        },
      } as IConnectorMessage);
    });
  }

  /**
   * Disconnect from the Okx browser or mobile extention to application. This method aborts the connection with the wallet and returns a Promise that resolves to void.
   * This method acts as a placeholder to meet the requirements of an abstract class or to customize the functionality for the current connector.
   * 
   * @returns {Promise<void>} A Promise that resolves when the disconnection is complete.
   * @example this.disconnect().then((res) => console.log(res),(err) => console.log(err));
   */

  public disconnect() {
    return Promise.resolve();
  }

  private ethRequestAccounts(): Promise<any> {
    return this.connector.request({ method: "eth_requestAccounts" });
  }

  private getChainId(): Promise<any> {
    return this.connector.request({ method: "eth_chainId" });
  }

  private async checkNet(): Promise<any> {
    try {
      const currentChain = await this.getChainId();

      if (this.chainID !== parseInt(currentChain)) {
        try {
          await this.connector.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${this.chainID.toString(16)}` }],
          });
          return true;
        } catch (err: any) {
          if (err.code === 4902) {
            if (
              !this.chainName ||
              !this.nativeCurrency ||
              !this.rpc ||
              !this.blockExplorerUrl
            ) {
              return true;
            }
            try {
              await this.connector.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${this.chainID.toString(16)}`,
                    chainName: this.chainName,
                    nativeCurrency: this.nativeCurrency,
                    rpcUrls: [this.rpc],
                    blockExplorerUrls: [this.blockExplorerUrl],
                  },
                ],
              });
              return true;
            } catch (err) {
              throw new Error("user reject add chain");
            }
          }
          throw new Error(`user reject switch network`);
        }
      }
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  public eventSubscriber(): Observable<IEvent | IEventError> {
    return new Observable((observer) => {
      this.connector.on("chainChanged", async (chainId: string) => {
        const accounts = await this.ethRequestAccounts();

        if (this.chainID !== parseInt(chainId)) {
          observer.error({
            code: 4,
            address: accounts[0],
            message: {
              title: "Error",
              subtitle: "chainChanged error",
              message: codeMap[4].name,
            },
          });
        }
        observer.next({
          address: accounts[0],
          network: parameters.chainsMap[chainId],
          name: "chainChanged",
        });
      });

      this.connector.on("accountsChanged", (address: Array<any>) => {
        if (address.length) {
          observer.next({
            address: address[0],
            network: parameters.chainsMap[parameters.chainIDMap[+this.chainID]],
            name: "accountsChanged",
          });
        } else {
          observer.error({
            code: 3,
            message: {
              title: "Error",
              subtitle: "Authorized error",
              message: codeMap[3].name,
            },
          });
        }
      });
    });
  }

  /**
   * Get account address and chain information from okx extention.
   *
   * @returns return an Observable array with data error or connected information.
   * @example this.getAccounts().subscribe((account: any)=> {console.log('account',account)});
   */

  public getAccounts(): Promise<any> {
    const error = {
      code: 3,
      message: {
        title: "Error",
        subtitle: "Authorized error",
        message: "You are not authorized.",
      },
    };

    return new Promise((resolve, reject) => {
      this.checkNet()
        .then(() => {
          this.ethRequestAccounts()
            .then((accounts) => {
              if (accounts[0]) {
                this.connector
                  .request({
                    method: "eth_chainId",
                  })
                  .then((chainID: string) => {
                    resolve({
                      address: accounts[0],
                      network:
                        parameters.chainsMap[parameters.chainIDMap[+chainID]],
                    });
                  });
              } else {
                reject(error);
              }
            })
            .catch(() => {
              reject({
                code: 3,
                message: {
                  title: "Error",
                  subtitle: "User rejected the request",
                  message: "User rejected the connect",
                },
              });
            });
        })
        .catch((err: any) => {
          error.code = 4;
          error.message = err.message;
          reject(error);
        });
    });
  }
}
