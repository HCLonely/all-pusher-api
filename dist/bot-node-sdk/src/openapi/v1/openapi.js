"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Setup = exports.OpenAPI = exports.apiVersion = void 0;
/* eslint-disable prefer-promise-reject-errors */
const openapi_1 = require("../../openapi/openapi");
const resty_client_1 = __importDefault(require("resty-client"));
const pins_message_1 = __importDefault(require("./pins-message"));
const reaction_1 = __importDefault(require("./reaction"));
const guild_1 = __importDefault(require("./guild"));
const channel_1 = __importDefault(require("./channel"));
const me_1 = __importDefault(require("./me"));
const message_1 = __importDefault(require("./message"));
const member_1 = __importDefault(require("./member"));
const role_1 = __importDefault(require("./role"));
const direct_message_1 = __importDefault(require("./direct-message"));
const channel_permissions_1 = __importDefault(require("./channel-permissions"));
const audio_1 = __importDefault(require("./audio"));
const mute_1 = __importDefault(require("./mute"));
const announce_1 = __importDefault(require("./announce"));
const schedule_1 = __importDefault(require("./schedule"));
const guild_permissions_1 = __importDefault(require("./guild-permissions"));
const utils_1 = require("../../utils/utils");
exports.apiVersion = 'v1';
class OpenAPI {
    constructor(config) {
        this.config = {
            appID: '',
            token: '',
        };
        this.config = config;
        this.register(this);
    }
    static newClient(config) {
        return new OpenAPI(config);
    }
    register(client) {
        // 注册聚合client
        client.guildApi = new guild_1.default(this.request, this.config);
        client.channelApi = new channel_1.default(this.request, this.config);
        client.meApi = new me_1.default(this.request, this.config);
        client.messageApi = new message_1.default(this.request, this.config);
        client.memberApi = new member_1.default(this.request, this.config);
        client.roleApi = new role_1.default(this.request, this.config);
        client.muteApi = new mute_1.default(this.request, this.config);
        client.announceApi = new announce_1.default(this.request, this.config);
        client.scheduleApi = new schedule_1.default(this.request, this.config);
        client.directMessageApi = new direct_message_1.default(this.request, this.config);
        client.channelPermissionsApi = new channel_permissions_1.default(this.request, this.config);
        client.audioApi = new audio_1.default(this.request, this.config);
        client.guildPermissionsApi = new guild_permissions_1.default(this.request, this.config);
        client.reactionApi = new reaction_1.default(this.request, this.config);
        client.pinsMessageApi = new pins_message_1.default(this.request, this.config);
    }
    // 基础rest请求
    request(options) {
        const { appID, token } = this.config;
        options.headers = Object.assign({}, options.headers);
        // 添加 UA
        (0, utils_1.addUserAgent)(options.headers);
        // 添加鉴权信息
        (0, utils_1.addAuthorization)(options.headers, appID, token);
        // 组装完整Url
        const botUrl = (0, utils_1.buildUrl)(options.url, this.config.sandbox);
        // 简化错误信息，后续可考虑通过中间件形式暴露给用户自行处理
        resty_client_1.default.useRes((result) => result, (error) => {
            var _a, _b, _c;
            let traceid = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['x-tps-trace-id'];
            if ((_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) {
                return Promise.reject(Object.assign(Object.assign({}, error.response.data), { traceid }));
            }
            if (error === null || error === void 0 ? void 0 : error.response) {
                return Promise.reject(Object.assign(Object.assign({}, error.response), { traceid }));
            }
            return Promise.reject(error);
        });
        const client = resty_client_1.default.create(options);
        return client.request(botUrl, options);
    }
}
exports.OpenAPI = OpenAPI;
function v1Setup() {
    (0, openapi_1.register)(exports.apiVersion, OpenAPI);
}
exports.v1Setup = v1Setup;
