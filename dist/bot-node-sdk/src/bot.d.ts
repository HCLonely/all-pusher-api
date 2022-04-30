import { OpenAPI } from './openapi/v1/openapi';
import { APIVersion, Config } from './types/openapi';
import { GetWsParam } from './types';
import WebsocketClient from './client/client';
export declare function selectOpenAPIVersion(version: APIVersion): false | undefined;
export declare function createOpenAPI(config: Config): OpenAPI;
export declare function createWebsocket(config: GetWsParam): WebsocketClient;
