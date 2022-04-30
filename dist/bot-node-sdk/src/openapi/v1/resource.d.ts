declare const apiMap: {
    guildURI: string;
    guildMembersURI: string;
    guildMemberURI: string;
    channelsURI: string;
    channelURI: string;
    guildAnnouncesURI: string;
    guildAnnounceURI: string;
    channelAnnouncesURI: string;
    channelAnnounceURI: string;
    messagesURI: string;
    messageURI: string;
    userMeURI: string;
    userMeGuildsURI: string;
    muteURI: string;
    muteMemberURI: string;
    gatewayURI: string;
    gatewayBotURI: string;
    audioControlURI: string;
    rolesURI: string;
    roleURI: string;
    memberRoleURI: string;
    userMeDMURI: string;
    dmsURI: string;
    channelPermissionsURI: string;
    channelRolePermissionsURI: string;
    schedulesURI: string;
    scheduleURI: string;
    guildPermissionURI: string;
    guildPermissionDemandURI: string;
    wsInfo: string;
    reactionURI: string;
    pinsMessageIdURI: string;
    pinsMessageURI: string;
};
export declare const getURL: (endpoint: keyof typeof apiMap) => string;
export {};