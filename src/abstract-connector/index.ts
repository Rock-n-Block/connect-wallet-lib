import { Observable } from 'rxjs';

import {
  IConnectorMessage,
  IProvider,
  IEvent,
  IEventError,
  INetwork,
} from '../interface';

export interface AbstractConnector {
  connector: any;
  name: string;
  connect: (provider?: IProvider, network?: INetwork) => Promise<IConnectorMessage>;
  disconnect: () => Promise<void>;
  eventSubscriber: () => Observable<IEvent | IEventError>;
  getAccounts: () => Promise<any>;
}
export interface AbstractConstructor {
  new (network?: INetwork): AbstractConnector;
}

