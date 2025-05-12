import { getURL } from './resource';
export default class Reaction {
    request;
    config;
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 发表表情表态
    postReaction(channelId, reactionToCreate) {
        const options = {
            method: 'PUT',
            url: getURL('reactionURI'),
            rest: {
                channelID: channelId,
                messageID: reactionToCreate?.message_id,
                emojiType: reactionToCreate?.emoji_type,
                emojiID: reactionToCreate?.emoji_id,
            },
        };
        return this.request(options);
    }
    // 删除表情表态
    deleteReaction(channelId, reactionToDelete) {
        const options = {
            method: 'DELETE',
            url: getURL('reactionURI'),
            rest: {
                channelID: channelId,
                messageID: reactionToDelete?.message_id,
                emojiType: reactionToDelete?.emoji_type,
                emojiID: reactionToDelete?.emoji_id,
            },
        };
        return this.request(options);
    }
}
