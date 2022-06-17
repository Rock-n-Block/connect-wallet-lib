import { IConnectorMessage, IError, IProvider } from "interface";

export const chainError: (text?: string) => IError = (text) => ({
  code: 4,
  message: {
    title: "Error",
    subtitle: "Chain error",
    text,
  },
});

export const providerError: (provider: IProvider) => IConnectorMessage = (
  provider
) => ({
  code: 2,
  type: "error",
  connected: false,
  provider,
  message: {
    title: "Error",
    subtitle: "Provider Error",
    text: `Your provider doesn't exists. Please add ${provider.name}`,
  },
});

export const gettingAddressError: (text?: string) => IError = (text) => ({
  code: 7,
  message: {
    title: "Error",
    subtitle: "Cant getting user address",
    text,
  },
});

export const invalidConfig: (provider: IProvider) => IConnectorMessage = (
  provider: IProvider
) => ({
  code: 8,
  type: "error",
  connected: false,
  provider,
  message: {
    title: "Error",
    subtitle: "Config error",
    text: `Your config is not valid`,
  },
});
