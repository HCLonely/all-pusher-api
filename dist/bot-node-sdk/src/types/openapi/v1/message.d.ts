import { RestyResponse } from 'resty-client';
import { IMember } from './guild';
import { IUser } from './me';
/**
 * =============  Message 消息接口  =============
 */
export interface MessageAPI {
    message: (channelID: string, messageID: string) => Promise<RestyResponse<IMessageRes>>;
    messages: (channelID: string, pager: MessagesPager) => Promise<RestyResponse<IMessage[]>>;
    postMessage: (channelID: string, message: MessageToCreate) => Promise<RestyResponse<IMessage>>;
    deleteMessage: (channelID: string, messageID: string, hideTip?: boolean) => Promise<RestyResponse<any>>;
}
export interface MessageAttachment {
    url: string;
}
export interface EmbedThumbnail {
    url: string;
}
export interface EmbedField {
    name: string;
}
export interface Embed {
    title: string;
    description?: string;
    prompt?: string;
    thumbnail?: EmbedThumbnail;
    fields?: EmbedField[];
}
export interface Ark {
    template_id: string;
    kv: ArkKV[];
}
export interface ArkKV {
    key: string;
    value: string;
    obj: ArkObj[];
}
export interface ArkObj {
    obj_kv: ArkObjKV[];
}
export interface ArkObjKV {
    key: string;
    value: string;
}
export interface IMessage {
    id: string;
    channel_id: string;
    guild_id: string;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    mention_everyone: boolean;
    author: IUser;
    member: IMember;
    attachments: MessageAttachment[];
    embeds: Embed[];
    mentions: IUser[];
    ark: Ark;
    seq?: number;
    seq_in_channel?: string;
}
export interface IMessageRes {
    message: IMessage;
}
export interface MessagesPager {
    type: 'around' | 'before' | 'after';
    id: string;
    limit: string;
}
export interface MessageReference {
    message_id: string;
    ignore_get_message_error?: boolean;
}
export interface MessageToCreate {
    content?: string;
    embed?: Embed;
    ark?: Ark;
    message_reference?: MessageReference;
    image?: string;
    msg_id?: string;
}
