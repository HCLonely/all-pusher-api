"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resource_1 = require("./resource");
class Reaction {
    constructor(request, config) {
        this.request = request;
        this.config = config;
    }
    // 发表表情表态
    postReaction(channelId, reactionToCreate) {
        const options = {
            method: 'PUT',
            url: (0, resource_1.getURL)('reactionURI'),
            rest: {
                channelID: channelId,
                messageID: reactionToCreate === null || reactionToCreate === void 0 ? void 0 : reactionToCreate.message_id,
                emojiType: reactionToCreate === null || reactionToCreate === void 0 ? void 0 : reactionToCreate.emoji_type,
                emojiID: reactionToCreate === null || reactionToCreate === void 0 ? void 0 : reactionToCreate.emoji_id,
            },
        };
        return this.request(options);
    }
    // 删除表情表态
    deleteReaction(channelId, reactionToDelete) {
        const options = {
            method: 'DELETE',
            url: (0, resource_1.getURL)('reactionURI'),
            rest: {
                channelID: channelId,
                messageID: reactionToDelete === null || reactionToDelete === void 0 ? void 0 : reactionToDelete.message_id,
                emojiType: reactionToDelete === null || reactionToDelete === void 0 ? void 0 : reactionToDelete.emoji_type,
                emojiID: reactionToDelete === null || reactionToDelete === void 0 ? void 0 : reactionToDelete.emoji_id,
            },
        };
        return this.request(options);
    }
}
exports.default = Reaction;
