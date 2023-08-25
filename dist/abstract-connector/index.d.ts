import { Observable } from 'rxjs';
import { IConnectorMessage, IProvider, IEvent, IEventError } from '../interface';
export declare abstract class AbstractConnector {
    abstract connector: any;
    constructor();
    abstract connect(provider?: IProvider): Promise<IConnectorMessage>;
    abstract eventSubscriber(): Observable<IEvent | IEventError>;
    abstract getAccounts(): Promise<any>;
}
