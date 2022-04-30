"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebsocket = exports.createOpenAPI = exports.selectOpenAPIVersion = void 0;
const openapi_1 = require("./openapi/v1/openapi");
const openapi_2 = require("./openapi/openapi");
const client_1 = __importDefault(require("./client/client"));
// 注册v1接口
(0, openapi_1.v1Setup)();
let defaultImpl = openapi_2.versionMapping[openapi_1.apiVersion];
// SelectOpenAPIVersion 指定使用哪个版本的 api 实现，如果不指定，sdk将默认使用第一个 setup 的 api 实现
function selectOpenAPIVersion(version) {
    if (!openapi_2.versionMapping[version]) {
        return false;
    }
    defaultImpl = openapi_2.versionMapping[version];
}
exports.selectOpenAPIVersion = selectOpenAPIVersion;
// 如果需要使用其他版本的实现，需要在调用这个方法之前调用 SelectOpenAPIVersion 方法
function createOpenAPI(config) {
    return defaultImpl.newClient(config);
}
exports.createOpenAPI = createOpenAPI;
// ws连接新建
function createWebsocket(config) {
    return new client_1.default(config);
}
exports.createWebsocket = createWebsocket;
