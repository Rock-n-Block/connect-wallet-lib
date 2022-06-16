import { IConnectorMessage, IError, IProvider } from "interface";
export declare const chainError: (text?: string) => IError;
export declare const providerError: (provider: IProvider) => IConnectorMessage;
export declare const gettingAddressError: (text?: string) => IError;
export declare const invalidConfig: (provider: IProvider) => IConnectorMessage;
