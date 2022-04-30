"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Audio {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 执行音频播放，暂停等操作
    postAudio(channelID, audioControl) {
        const options = {
            method: 'POST',
            url: (0, resource_1.getURL)('audioControlURI'),
            rest: {
                channelID,
            },
            data: audioControl,
        };
        return this.request(options);
    }
}
exports.default = Audio;
