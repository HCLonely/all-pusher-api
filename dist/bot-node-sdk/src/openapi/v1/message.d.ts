import { Config, OpenAPIRequest, IMessage, IMessageRes, MessageAPI, MessagesPager, MessageToCreate } from '../../types';
import { RestyResponse } from 'resty-client';
export default class Message implements MessageAPI {
    request: OpenAPIRequest;
    config: Config;
    constructor(request: OpenAPIRequest, config: Config);
    message(channelID: string, messageID: string): Promise<RestyResponse<IMessageRes>>;
    messages(channelID: string, pager?: MessagesPager): Promise<RestyResponse<IMessage[]>>;
    postMessage(channelID: string, message: MessageToCreate): Promise<RestyResponse<IMessage>>;
    deleteMessage(channelID: string, messageID: string, hideTip?: boolean): Promise<RestyResponse<any>>;
}
