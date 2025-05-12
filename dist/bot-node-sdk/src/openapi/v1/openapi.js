/* eslint-disable prefer-promise-reject-errors */
import { register } from '../../openapi/openapi';
import resty from 'resty-client';
import PinsMessage from './pins-message';
import Reaction from './reaction';
import Guild from './guild';
import Channel from './channel';
import Me from './me';
import Message from './message';
import Member from './member';
import Role from './role';
import DirectMessage from './direct-message';
import ChannelPermissions from './channel-permissions';
import Audio from './audio';
import Mute from './mute';
import Announce from './announce';
import Schedule from './schedule';
import GuildPermissions from './guild-permissions';
import { addUserAgent, addAuthorization, buildUrl } from '../../utils/utils';
export const apiVersion = 'v1';
export class OpenAPI {
    static newClient(config) {
        return new OpenAPI(config);
    }
    config = {
        appID: '',
        token: '',
    };
    guildApi;
    channelApi;
    meApi;
    messageApi;
    memberApi;
    roleApi;
    muteApi;
    announceApi;
    scheduleApi;
    directMessageApi;
    channelPermissionsApi;
    audioApi;
    reactionApi;
    pinsMessageApi;
    guildPermissionsApi;
    constructor(config) {
        this.config = config;
        this.register(this);
    }
    register(client) {
        // 注册聚合client
        client.guildApi = new Guild(this.request, this.config);
        client.channelApi = new Channel(this.request, this.config);
        client.meApi = new Me(this.request, this.config);
        client.messageApi = new Message(this.request, this.config);
        client.memberApi = new Member(this.request, this.config);
        client.roleApi = new Role(this.request, this.config);
        client.muteApi = new Mute(this.request, this.config);
        client.announceApi = new Announce(this.request, this.config);
        client.scheduleApi = new Schedule(this.request, this.config);
        client.directMessageApi = new DirectMessage(this.request, this.config);
        client.channelPermissionsApi = new ChannelPermissions(this.request, this.config);
        client.audioApi = new Audio(this.request, this.config);
        client.guildPermissionsApi = new GuildPermissions(this.request, this.config);
        client.reactionApi = new Reaction(this.request, this.config);
        client.pinsMessageApi = new PinsMessage(this.request, this.config);
    }
    // 基础rest请求
    request(options) {
        const { appID, token } = this.config;
        options.headers = { ...options.headers };
        // 添加 UA
        // @ts-ignore
        addUserAgent(options.headers);
        // 添加鉴权信息
        // @ts-ignore
        addAuthorization(options.headers, appID, token);
        // 组装完整Url
        const botUrl = buildUrl(options.url, this.config.sandbox);
        // 简化错误信息，后续可考虑通过中间件形式暴露给用户自行处理
        resty.useRes((result) => result, (error) => {
            let traceid = error?.response?.headers?.['x-tps-trace-id'];
            if (error?.response?.data) {
                return Promise.reject({
                    ...error.response.data,
                    traceid,
                });
            }
            if (error?.response) {
                return Promise.reject({
                    ...error.response,
                    traceid,
                });
            }
            return Promise.reject(error);
        });
        const client = resty.create(options);
        return client.request(botUrl, options);
    }
}
export function v1Setup() {
    register(apiVersion, OpenAPI);
}
