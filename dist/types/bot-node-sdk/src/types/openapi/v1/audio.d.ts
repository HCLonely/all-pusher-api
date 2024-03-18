import { RestyResponse } from 'resty-client';
export interface AudioAPI {
    postAudio: (channelID: string, value: AudioControl) => Promise<RestyResponse<AudioControl>>;
}
export interface AudioControl {
    audioUrl: string;
    text: string;
    status: number;
}
