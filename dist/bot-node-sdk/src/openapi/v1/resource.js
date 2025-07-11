const apiMap = {
    guildURI: '/guilds/:guildID',
    guildMembersURI: '/guilds/:guildID/members',
    guildMemberURI: '/guilds/:guildID/members/:userID',
    channelsURI: '/guilds/:guildID/channels',
    channelURI: '/channels/:channelID',
    guildAnnouncesURI: '/guilds/:guildID/announces',
    guildAnnounceURI: '/guilds/:guildID/announces/:messageID',
    channelAnnouncesURI: '/channels/:channelID/announces',
    channelAnnounceURI: '/channels/:channelID/announces/:messageID',
    messagesURI: '/channels/:channelID/messages',
    messageURI: '/channels/:channelID/messages/:messageID',
    userMeURI: '/users/@me',
    userMeGuildsURI: '/users/@me/guilds',
    muteURI: '/guilds/:guildID/mute',
    muteMemberURI: '/guilds/:guildID/members/:userID/mute',
    gatewayURI: '/gateway',
    gatewayBotURI: '/gateway/bot',
    audioControlURI: '/channels/:channelID/audio',
    rolesURI: '/guilds/:guildID/roles',
    roleURI: '/guilds/:guildID/roles/:roleID',
    memberRoleURI: '/guilds/:guildID/members/:userID/roles/:roleID',
    userMeDMURI: '/users/@me/dms',
    dmsURI: '/dms/:guildID/messages',
    channelPermissionsURI: '/channels/:channelID/members/:userID/permissions',
    channelRolePermissionsURI: '/channels/:channelID/roles/:roleID/permissions',
    schedulesURI: '/channels/:channelID/schedules',
    scheduleURI: '/channels/:channelID/schedules/:scheduleID',
    guildPermissionURI: '/guilds/:guildID/api_permission',
    guildPermissionDemandURI: '/guilds/:guildID/api_permission/demand',
    wsInfo: '/gateway/bot',
    reactionURI: '/channels/:channelID/messages/:messageID/reactions/:emojiType/:emojiID',
    pinsMessageIdURI: '/channels/:channelID/pins/:messageID',
    pinsMessageURI: '/channels/:channelID/pins',
};
export const getURL = (endpoint) => apiMap[endpoint];
