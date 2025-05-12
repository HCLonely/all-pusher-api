import { getURL } from './resource';
export default class Audio {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 执行音频播放，暂停等操作
    postAudio(channelID, audioControl) {
        const options = {
            method: 'POST',
            url: getURL('audioControlURI'),
            rest: {
                channelID,
            },
            data: audioControl,
        };
        return this.request(options);
    }
}
