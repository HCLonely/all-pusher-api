import { result, sendOptions } from './tool';
interface PushApiConfig {
    name: string;
    config: any;
}
interface SendResult {
    name: string;
    result: result;
}
declare class PushApi {
    pushers: Array<{
        name: string;
        pusher: any;
    }>;
    constructor(configs: PushApiConfig[]);
    send(sendOptions: Array<{
        name: string;
        options: sendOptions;
    }> | sendOptions): Promise<SendResult[]>;
}
export { PushApi };
