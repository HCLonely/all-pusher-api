"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./v1/audio"), exports);
__exportStar(require("./v1/channel"), exports);
__exportStar(require("./v1/channel-permission"), exports);
__exportStar(require("./v1/direct-message"), exports);
__exportStar(require("./v1/guild"), exports);
__exportStar(require("./v1/me"), exports);
__exportStar(require("./v1/member"), exports);
__exportStar(require("./v1/message"), exports);
__exportStar(require("./v1/role"), exports);
__exportStar(require("./v1/mute"), exports);
__exportStar(require("./v1/announce"), exports);
__exportStar(require("./v1/schedule"), exports);
__exportStar(require("./v1/reaction"), exports);
__exportStar(require("./v1/pins-message"), exports);
__exportStar(require("./v1/guild-permission"), exports);
