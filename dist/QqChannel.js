'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var resty = require('resty-client');
var WebSocket = require('ws');
const versionMapping = Object.create(null);
function register(version, api) {
  versionMapping[version] = api;
}
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
  pinsMessageURI: '/channels/:channelID/pins'
};
const getURL = endpoint => apiMap[endpoint];
class PinsMessage {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取精华消息
  pinsMessage(channelID) {
    const options = {
      method: 'GET',
      url: getURL('pinsMessageURI'),
      rest: {
        channelID
      }
    };
    return this.request(options);
  }
  // 发送精华消息
  putPinsMessage(channelID, messageID) {
    const options = {
      method: 'PUT',
      url: getURL('pinsMessageIdURI'),
      headers: {
        'Content-Type': 'application/json;'
      },
      rest: {
        channelID,
        messageID
      }
    };
    return this.request(options);
  }
  // 删除精华消息
  deletePinsMessage(channelID, messageID) {
    const options = {
      method: 'DELETE',
      url: getURL('pinsMessageIdURI'),
      rest: {
        channelID,
        messageID
      }
    };
    return this.request(options);
  }
}
class Reaction {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
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
        messageID: reactionToCreate === null || reactionToCreate === void 0 ? void 0 : reactionToCreate.message_id,
        emojiType: reactionToCreate === null || reactionToCreate === void 0 ? void 0 : reactionToCreate.emoji_type,
        emojiID: reactionToCreate === null || reactionToCreate === void 0 ? void 0 : reactionToCreate.emoji_id
      }
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
        messageID: reactionToDelete === null || reactionToDelete === void 0 ? void 0 : reactionToDelete.message_id,
        emojiType: reactionToDelete === null || reactionToDelete === void 0 ? void 0 : reactionToDelete.emoji_type,
        emojiID: reactionToDelete === null || reactionToDelete === void 0 ? void 0 : reactionToDelete.emoji_id
      }
    };
    return this.request(options);
  }
}
class Guild {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取频道信息
  guild(guildID) {
    const options = {
      method: 'GET',
      url: getURL('guildURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  }
  // 获取某个成员信息
  guildMember(guildID, userID) {
    const options = {
      method: 'GET',
      url: getURL('guildMemberURI'),
      rest: {
        guildID,
        userID
      }
    };
    return this.request(options);
  }
  // 获取频道成员列表
  guildMembers(guildID, pager) {
    pager = pager || {
      after: '0',
      limit: 1
    };
    const options = {
      method: 'GET',
      url: getURL('guildMembersURI'),
      rest: {
        guildID
      },
      params: pager
    };
    return this.request(options);
  }
  // 删除指定频道成员
  deleteGuildMember(guildID, userID) {
    const options = {
      method: 'DELETE',
      url: getURL('guildMemberURI'),
      rest: {
        guildID,
        userID
      }
    };
    return this.request(options);
  }
}
var version = "2.9.1";

// 转为对象
const toObject = data => {
  if (Buffer.isBuffer(data)) return JSON.parse(data.toString());
  if (typeof data === 'object') return data;
  if (typeof data === 'string') return JSON.parse(data);
  // return String(data);
};
// 获取number类型的10位时间戳
const getTimeStampNumber = () => Number(new Date().getTime().toString().substr(0, 10));
// 添加 User-Agent
const addUserAgent = header => {
  const sdkVersion = version;
  header['User-Agent'] = `BotNodeSDK/v${sdkVersion}`;
};
// 添加 User-Agent
const addAuthorization = (header, appID, token) => {
  header['Authorization'] = `Bot ${appID}.${token}`;
};
// 组装完整Url
const buildUrl = (path = '', isSandbox) => {
  return `${isSandbox ? 'https://sandbox.api.sgroup.qq.com' : 'https://api.sgroup.qq.com'}${path}`;
};
class Channel {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取子频道信息
  channel(channelID) {
    const options = {
      method: 'GET',
      url: getURL('channelURI'),
      rest: {
        channelID
      }
    };
    return this.request(options);
  }
  // 获取频道下的子频道列表
  channels(guildID) {
    const options = {
      method: 'GET',
      url: getURL('channelsURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  }
  // 创建子频道
  postChannel(guildID, channel) {
    if (channel.position === 0) {
      channel.position = getTimeStampNumber();
    }
    const options = {
      method: 'POST',
      url: getURL('channelsURI'),
      rest: {
        guildID
      },
      data: channel
    };
    return this.request(options);
  }
  // 修改子频道信息
  patchChannel(channelID, channel) {
    if (channel.position === 0) {
      channel.position = getTimeStampNumber();
    }
    const options = {
      method: 'PATCH',
      url: getURL('channelURI'),
      rest: {
        channelID
      },
      data: channel
    };
    return this.request(options);
  }
  // 删除指定子频道
  deleteChannel(channelID) {
    const options = {
      method: 'DELETE',
      url: getURL('channelURI'),
      rest: {
        channelID
      }
    };
    return this.request(options);
  }
}
class Me {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取当前用户信息
  me() {
    const options = {
      method: 'GET',
      url: getURL('userMeURI')
    };
    return this.request(options);
  }
  // 获取当前用户频道列表
  meGuilds(options) {
    const reqOptions = {
      method: 'GET',
      url: getURL('userMeGuildsURI'),
      params: options
    };
    return this.request(reqOptions);
  }
}
class Message {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取指定消息
  message(channelID, messageID) {
    const options = {
      method: 'GET',
      url: getURL('messageURI'),
      rest: {
        channelID,
        messageID
      }
    };
    return this.request(options);
  }
  // 获取消息列表
  messages(channelID, pager) {
    const params = Object.create(null);
    if (pager && pager.type && pager.id) {
      params[pager.type] = pager.id;
      params.limit = pager.limit || 20;
    }
    const options = {
      method: 'GET',
      url: getURL('messagesURI'),
      rest: {
        channelID
      },
      params
    };
    return this.request(options);
  }
  // 发送消息
  postMessage(channelID, message) {
    const options = {
      method: 'POST',
      url: getURL('messagesURI'),
      rest: {
        channelID
      },
      data: message
    };
    return this.request(options);
  }
  // 撤回消息
  deleteMessage(channelID, messageID, hideTip) {
    const params = Object.create(null);
    if (hideTip) {
      params.hidetip = hideTip;
    }
    const options = {
      method: 'DELETE',
      url: getURL('messageURI'),
      rest: {
        channelID,
        messageID
      },
      params
    };
    return this.request(options);
  }
}
class Member {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 增加频道身份组成员
  memberAddRole(guildID, roleID, userID, channel) {
    const channelObj = typeof channel === 'string' ? {
      channel: {
        id: channel
      }
    } : channel;
    const options = {
      method: 'PUT',
      url: getURL('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID
      },
      data: channelObj
    };
    return this.request(options);
  }
  // 删除频道身份组成员
  memberDeleteRole(guildID, roleID, userID, channel) {
    const channelObj = typeof channel === 'string' ? {
      channel: {
        id: channel
      }
    } : channel;
    const options = {
      method: 'DELETE',
      url: getURL('memberRoleURI'),
      rest: {
        guildID,
        userID,
        roleID
      },
      data: channelObj
    };
    return this.request(options);
  }
}

// 默认的filter：0 1 代表是否设置 0-否 1-是
const defaultFilter = {
  name: 1,
  color: 1,
  hoist: 1
};
// 用户组默认颜色值
const defaultColor = 4278245297;
class Role {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取频道身份组列表
  roles(guildID) {
    const options = {
      method: 'GET',
      url: getURL('rolesURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  }
  // 创建频道身份组
  postRole(guildID, role, filter = defaultFilter) {
    if (role.color === 0) {
      role.color = defaultColor;
    }
    const options = {
      method: 'POST',
      url: getURL('rolesURI'),
      rest: {
        guildID
      },
      data: {
        guild_id: guildID,
        filter,
        info: role
      }
    };
    return this.request(options);
  }
  // 修改频道身份组
  patchRole(guildID, roleID, role, filter = defaultFilter) {
    if (role.color === 0) {
      role.color = defaultColor;
    }
    const options = {
      method: 'PATCH',
      url: getURL('roleURI'),
      rest: {
        guildID,
        roleID
      },
      data: {
        guild_id: guildID,
        filter,
        info: role
      }
    };
    return this.request(options);
  }
  // 删除频道身份组
  deleteRole(guildID, roleID) {
    const options = {
      method: 'DELETE',
      url: getURL('roleURI'),
      rest: {
        guildID,
        roleID
      }
    };
    return this.request(options);
  }
}
class DirectMessage {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 创建私信频道
  createDirectMessage(dm) {
    const options = {
      method: 'POST',
      url: getURL('userMeDMURI'),
      data: dm
    };
    return this.request(options);
  }
  // 在私信频道内发消息
  postDirectMessage(guildID, msg) {
    const options = {
      method: 'POST',
      url: getURL('dmsURI'),
      rest: {
        guildID
      },
      data: msg
    };
    return this.request(options);
  }
}
class ChannelPermissions {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取指定子频道的权限
  channelPermissions(channelID, userID) {
    const options = {
      method: 'GET',
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID
      }
    };
    return this.request(options);
  }
  // 修改指定子频道的权限
  putChannelPermissions(channelID, userID, p) {
    try {
      // 校验参数
      parseInt(p.add, 10);
      parseInt(p.remove, 10);
    } catch (error) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const options = {
      method: 'PUT',
      url: getURL('channelPermissionsURI'),
      rest: {
        channelID,
        userID
      },
      data: p
    };
    return this.request(options);
  }
  // 获取指定子频道身份组的权限
  channelRolePermissions(channelID, roleID) {
    const options = {
      method: 'GET',
      url: getURL('channelRolePermissionsURI'),
      rest: {
        channelID,
        roleID
      }
    };
    return this.request(options);
  }
  // 修改指定子频道身份组的权限
  putChannelRolePermissions(channelID, roleID, p) {
    try {
      // 校验参数
      parseInt(p.add, 10);
      parseInt(p.remove, 10);
    } catch (error) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const options = {
      method: 'PUT',
      url: getURL('channelRolePermissionsURI'),
      rest: {
        channelID,
        roleID
      },
      data: p
    };
    return this.request(options);
  }
}
class Audio {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 执行音频播放，暂停等操作
  postAudio(channelID, audioControl) {
    const options = {
      method: 'POST',
      url: getURL('audioControlURI'),
      rest: {
        channelID
      },
      data: audioControl
    };
    return this.request(options);
  }
}
class Mute {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 禁言某个member
  muteMember(guildID, userID, options) {
    if (!options) {
      return Promise.reject(new Error("'options' required!"));
    }
    const reqOptions = {
      method: 'PATCH',
      url: getURL('muteMemberURI'),
      rest: {
        guildID,
        userID
      },
      data: {
        mute_end_timestamp: options === null || options === void 0 ? void 0 : options.timeTo,
        mute_seconds: options === null || options === void 0 ? void 0 : options.seconds
      }
    };
    return this.request(reqOptions);
  }
  // 禁言所有人
  muteAll(guildID, options) {
    if (!options) {
      return Promise.reject(new Error("'options' required!"));
    }
    const reqOptions = {
      method: 'PATCH',
      url: getURL('muteURI'),
      rest: {
        guildID
      },
      data: {
        mute_end_timestamp: options === null || options === void 0 ? void 0 : options.timeTo,
        mute_seconds: options === null || options === void 0 ? void 0 : options.seconds
      }
    };
    return this.request(reqOptions);
  }
}
class Announce {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 创建guild公告
  postGuildAnnounce(guildID, channelID, messageID) {
    const options = {
      method: 'POST',
      url: getURL('guildAnnouncesURI'),
      rest: {
        guildID
      },
      data: {
        channel_id: channelID,
        message_id: messageID
      }
    };
    return this.request(options);
  }
  // 删除guild公告
  deleteGuildAnnounce(guildID, messageID) {
    const options = {
      method: 'DELETE',
      url: getURL('guildAnnounceURI'),
      rest: {
        guildID,
        messageID
      }
    };
    return this.request(options);
  }
  // 创建频道公告推荐子频道
  postGuildRecommend(guildID, recommendObj) {
    const options = {
      method: 'POST',
      url: getURL('guildAnnouncesURI'),
      rest: {
        guildID
      },
      data: recommendObj
    };
    return this.request(options);
  }
  // 创建channel公告
  postChannelAnnounce(channelID, messageID) {
    const options = {
      method: 'POST',
      url: getURL('channelAnnouncesURI'),
      rest: {
        channelID
      },
      data: {
        message_id: messageID
      }
    };
    return this.request(options);
  }
  // 删除channel公告
  deleteChannelAnnounce(channelID, messageID) {
    const options = {
      method: 'DELETE',
      url: getURL('channelAnnounceURI'),
      rest: {
        channelID,
        messageID
      }
    };
    return this.request(options);
  }
}
class Schedule {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取日程列表
  schedules(channelID, since) {
    if (since && since.length !== 13) {
      return Promise.reject(new Error("Param 'since' is invalid, millisecond timestamp expected！"));
    }
    const options = {
      method: 'GET',
      url: getURL('schedulesURI'),
      rest: {
        channelID
      },
      params: {
        since
      }
    };
    return this.request(options);
  }
  // 获取日程
  schedule(channelID, scheduleID) {
    const options = {
      method: 'GET',
      url: getURL('scheduleURI'),
      rest: {
        channelID,
        scheduleID
      }
    };
    return this.request(options);
  }
  // 创建日程
  postSchedule(channelID, schedule) {
    const options = {
      method: 'POST',
      url: getURL('schedulesURI'),
      rest: {
        channelID
      },
      data: {
        schedule
      }
    };
    return this.request(options);
  }
  // 修改日程
  patchSchedule(channelID, scheduleID, schedule) {
    const options = {
      method: 'PATCH',
      url: getURL('scheduleURI'),
      rest: {
        channelID,
        scheduleID
      },
      data: {
        schedule
      }
    };
    return this.request(options);
  }
  // 删除日程
  deleteSchedule(channelID, scheduleID) {
    const options = {
      method: 'DELETE',
      url: getURL('scheduleURI'),
      rest: {
        channelID,
        scheduleID
      }
    };
    return this.request(options);
  }
}
class GuildPermissions {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);
    _defineProperty(this, "config", void 0);
    this.request = request;
    this.config = config;
  }
  // 获取频道可用权限列表
  permissions(guildID) {
    const options = {
      method: 'GET',
      url: getURL('guildPermissionURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  }
  // 创建频道 API 接口权限授权链接
  postPermissionDemand(guildID, permissionDemandObj) {
    const options = {
      method: 'POST',
      url: getURL('guildPermissionDemandURI'),
      rest: {
        guildID
      },
      data: permissionDemandObj
    };
    return this.request(options);
  }
}

/* eslint-disable prefer-promise-reject-errors */
const apiVersion = 'v1';
class OpenAPI {
  static newClient(config) {
    return new OpenAPI(config);
  }
  constructor(config) {
    _defineProperty(this, "config", {
      appID: '',
      token: ''
    });
    _defineProperty(this, "guildApi", void 0);
    _defineProperty(this, "channelApi", void 0);
    _defineProperty(this, "meApi", void 0);
    _defineProperty(this, "messageApi", void 0);
    _defineProperty(this, "memberApi", void 0);
    _defineProperty(this, "roleApi", void 0);
    _defineProperty(this, "muteApi", void 0);
    _defineProperty(this, "announceApi", void 0);
    _defineProperty(this, "scheduleApi", void 0);
    _defineProperty(this, "directMessageApi", void 0);
    _defineProperty(this, "channelPermissionsApi", void 0);
    _defineProperty(this, "audioApi", void 0);
    _defineProperty(this, "reactionApi", void 0);
    _defineProperty(this, "pinsMessageApi", void 0);
    _defineProperty(this, "guildPermissionsApi", void 0);
    this.config = config;
    this.register(this);
  }
  register(client) {
    // 注册聚合client
    client.guildApi = new Guild(this.request, this.config);
    client.channelApi = new Channel(this.request, this.config);
    client.meApi = new Me(this.request, this.config);
    client.messageApi = new Message(this.request, this.config);
    client.memberApi = new Member(this.request, this.config);
    client.roleApi = new Role(this.request, this.config);
    client.muteApi = new Mute(this.request, this.config);
    client.announceApi = new Announce(this.request, this.config);
    client.scheduleApi = new Schedule(this.request, this.config);
    client.directMessageApi = new DirectMessage(this.request, this.config);
    client.channelPermissionsApi = new ChannelPermissions(this.request, this.config);
    client.audioApi = new Audio(this.request, this.config);
    client.guildPermissionsApi = new GuildPermissions(this.request, this.config);
    client.reactionApi = new Reaction(this.request, this.config);
    client.pinsMessageApi = new PinsMessage(this.request, this.config);
  }
  // 基础rest请求
  request(options) {
    const {
      appID,
      token
    } = this.config;
    options.headers = {
      ...options.headers
    };
    // 添加 UA
    // @ts-ignore
    addUserAgent(options.headers);
    // 添加鉴权信息
    // @ts-ignore
    addAuthorization(options.headers, appID, token);
    // 组装完整Url
    const botUrl = buildUrl(options.url, this.config.sandbox);
    // 简化错误信息，后续可考虑通过中间件形式暴露给用户自行处理
    resty.useRes(result => result, error => {
      var _error$response, _error$response2;
      let traceid = error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.headers) === null || _error$response === void 0 ? void 0 : _error$response['x-tps-trace-id'];
      if (error !== null && error !== void 0 && (_error$response2 = error.response) !== null && _error$response2 !== void 0 && _error$response2.data) {
        return Promise.reject({
          ...error.response.data,
          traceid
        });
      }
      if (error !== null && error !== void 0 && error.response) {
        return Promise.reject({
          ...error.response,
          traceid
        });
      }
      return Promise.reject(error);
    });
    const client = resty.create(options);
    return client.request(botUrl, options);
  }
}
function v1Setup() {
  register(apiVersion, OpenAPI);
}

// 心跳参数
var OpCode;
(function (OpCode) {
  OpCode[OpCode["DISPATCH"] = 0] = "DISPATCH";
  OpCode[OpCode["HEARTBEAT"] = 1] = "HEARTBEAT";
  OpCode[OpCode["IDENTIFY"] = 2] = "IDENTIFY";
  OpCode[OpCode["RESUME"] = 6] = "RESUME";
  OpCode[OpCode["RECONNECT"] = 7] = "RECONNECT";
  OpCode[OpCode["INVALID_SESSION"] = 9] = "INVALID_SESSION";
  OpCode[OpCode["HELLO"] = 10] = "HELLO";
  OpCode[OpCode["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
})(OpCode || (OpCode = {}));
// 可使用的intents事件类型
var AvailableIntentsEventsEnum;
(function (AvailableIntentsEventsEnum) {
  AvailableIntentsEventsEnum["GUILDS"] = "GUILDS";
  AvailableIntentsEventsEnum["GUILD_MEMBERS"] = "GUILD_MEMBERS";
  AvailableIntentsEventsEnum["GUILD_MESSAGES"] = "GUILD_MESSAGES";
  AvailableIntentsEventsEnum["GUILD_MESSAGE_REACTIONS"] = "GUILD_MESSAGE_REACTIONS";
  AvailableIntentsEventsEnum["DIRECT_MESSAGE"] = "DIRECT_MESSAGE";
  AvailableIntentsEventsEnum["FORUM_EVENT"] = "FORUM_EVENT";
  AvailableIntentsEventsEnum["AUDIO_ACTION"] = "AUDIO_ACTION";
  AvailableIntentsEventsEnum["AT_MESSAGES"] = "AT_MESSAGES";
  AvailableIntentsEventsEnum["MESSAGE_AUDIT"] = "MESSAGE_AUDIT";
})(AvailableIntentsEventsEnum || (AvailableIntentsEventsEnum = {}));
// OpenAPI传过来的事件类型
const WsEventType = {
  //  ======= GUILDS ======
  GUILD_CREATE: AvailableIntentsEventsEnum.GUILDS,
  // 频道创建
  GUILD_UPDATE: AvailableIntentsEventsEnum.GUILDS,
  // 频道更新
  GUILD_DELETE: AvailableIntentsEventsEnum.GUILDS,
  // 频道删除
  CHANNEL_CREATE: AvailableIntentsEventsEnum.GUILDS,
  // 子频道创建
  CHANNEL_UPDATE: AvailableIntentsEventsEnum.GUILDS,
  // 子频道更新
  CHANNEL_DELETE: AvailableIntentsEventsEnum.GUILDS,
  // 子频道删除
  //  ======= GUILD_MEMBERS ======
  GUILD_MEMBER_ADD: AvailableIntentsEventsEnum.GUILD_MEMBERS,
  // 频道成员加入
  GUILD_MEMBER_UPDATE: AvailableIntentsEventsEnum.GUILD_MEMBERS,
  // 频道成员更新
  GUILD_MEMBER_REMOVE: AvailableIntentsEventsEnum.GUILD_MEMBERS,
  // 频道成员移除
  //  ======= AUDIO_ACTION ======
  AUDIO_START: AvailableIntentsEventsEnum.AUDIO_ACTION,
  // 音频开始播放
  AUDIO_FINISH: AvailableIntentsEventsEnum.AUDIO_ACTION,
  // 音频结束播放
  AUDIO_ON_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION,
  // 机器人上麦
  AUDIO_OFF_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION,
  // 机器人下麦
  //  ======= GUILD_MESSAGE_REACTIONS ======
  MESSAGE_REACTION_ADD: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS,
  // 为消息添加表情表态
  MESSAGE_REACTION_REMOVE: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS,
  // 为消息删除表情表态
  //  ======= MESSAGE_AUDIT ======
  MESSAGE_AUDIT_PASS: AvailableIntentsEventsEnum.MESSAGE_AUDIT,
  // / 消息审核通过
  MESSAGE_AUDIT_REJECT: AvailableIntentsEventsEnum.MESSAGE_AUDIT,
  // / 消息审核不通过
  //  ======= FORUM_EVENT ======
  THREAD_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  // / 当用户创建主题时
  THREAD_UPDATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  // 当用户删除主题时
  POST_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  // 当用户创建帖子时
  POST_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT,
  // 当用户删除帖子时
  REPLY_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  // 当用户回复评论时
  REPLY_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT,
  // 当用户回复评论时
  //  ======= DIRECT_MESSAGE ======
  DIRECT_MESSAGE_CREATE: AvailableIntentsEventsEnum.DIRECT_MESSAGE,
  // 当收到用户发给机器人的私信消息时
  //  ======= AT_MESSAGES ======
  AT_MESSAGE_CREATE: AvailableIntentsEventsEnum.AT_MESSAGES,
  // 机器人被@时触发
  //  ======= GUILD_MESSAGES ======
  MESSAGE_CREATE: AvailableIntentsEventsEnum.GUILD_MESSAGES // 机器人收到频道消息时触发
};
// websocket错误原因
const WebsocketCloseReason = [{
  code: 4001,
  reason: '无效的opcode'
}, {
  code: 4002,
  reason: '无效的payload'
}, {
  code: 4007,
  reason: 'seq错误'
}, {
  code: 4008,
  reason: '发送 payload 过快，请重新连接，并遵守连接后返回的频控信息',
  resume: true
}, {
  code: 4009,
  reason: '连接过期，请重连',
  resume: true
}, {
  code: 4010,
  reason: '无效的shard'
}, {
  code: 4011,
  reason: '连接需要处理的guild过多，请进行合理分片'
}, {
  code: 4012,
  reason: '无效的version'
}, {
  code: 4013,
  reason: '无效的intent'
}, {
  code: 4014,
  reason: 'intent无权限'
}, {
  code: 4900,
  reason: '内部错误，请重连'
}, {
  code: 4914,
  reason: '机器人已下架,只允许连接沙箱环境,请断开连接,检验当前连接环境'
}, {
  code: 4915,
  reason: '机器人已封禁,不允许连接,请断开连接,申请解封后再连接'
}];
// 用户输入的intents类型
const IntentEvents = {
  GUILDS: 1 << 0,
  GUILD_MEMBERS: 1 << 1,
  GUILD_MESSAGES: 1 << 9,
  GUILD_MESSAGE_REACTIONS: 1 << 10,
  DIRECT_MESSAGE: 1 << 12,
  MESSAGE_AUDIT: 1 << 27,
  FORUM_EVENT: 1 << 28,
  AUDIO_ACTION: 1 << 29,
  AT_MESSAGES: 1 << 30
};
// Session事件
const SessionEvents = {
  CLOSED: 'CLOSED',
  READY: 'READY',
  // 已经可以通信
  ERROR: 'ERROR',
  // 会话错误
  INVALID_SESSION: 'INVALID_SESSION',
  RECONNECT: 'RECONNECT',
  // 服务端通知重新连接
  DISCONNECT: 'DISCONNECT',
  // 断线
  EVENT_WS: 'EVENT_WS',
  // 内部通信
  RESUMED: 'RESUMED',
  // 重连
  DEAD: 'DEAD' // 连接已死亡，请检查网络或重启
};
// ws地址配置
const WsObjRequestOptions = sandbox => ({
  method: 'GET',
  url: buildUrl(getURL('wsInfo'), sandbox),
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'utf-8',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    Connection: 'keep-alive',
    'User-Agent': apiVersion,
    Authorization: ''
  }
});

// 配置文件
// 后台校验暂时用不到这块，所以给一个默认值
const Properties = {
  os: 'linux',
  browser: 'my_library',
  device: 'my_library'
};

// websocket连接
class Ws {
  constructor(config, event, sessionRecord) {
    _defineProperty(this, "ws", void 0);
    _defineProperty(this, "event", void 0);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "heartbeatInterval", void 0);
    // 心跳参数，默认为心跳测试
    _defineProperty(this, "heartbeatParam", {
      op: OpCode.HEARTBEAT,
      d: null // 心跳唯一值
    });
    // 是否是断线重连，如果是断线重连的话，不需要走鉴权
    _defineProperty(this, "isReconnect", void 0);
    // 记录会话参数
    _defineProperty(this, "sessionRecord", {
      sessionID: '',
      seq: 0
    });
    _defineProperty(this, "alive", false);
    _defineProperty(this, "heartbeatTimeout", void 0);
    this.config = config;
    this.isReconnect = false;
    this.event = event;
    // 如果是重连，则拿到重新的会话记录，然后进入重连步骤
    if (sessionRecord) {
      this.sessionRecord.sessionID = sessionRecord.sessionID;
      this.sessionRecord.seq = sessionRecord.seq;
      this.isReconnect = true;
    }
  }
  // 创建一个websocket连接
  createWebsocket(wsData) {
    // 先链接到ws
    this.connectWs(wsData);
    // 对消息进行监听
    return this.createListening();
  }
  // 创建监听
  createListening() {
    // websocket连接已开启
    this.ws.on('open', () => {
      // console.log(`[CLIENT] 开启`);
    });
    // 接受消息
    this.ws.on('message', data => {
      var _wsRes$d;
      // console.log(`[CLIENT] 收到消息: ${data}`);
      // 先将消息解析
      const wsRes = toObject(data);
      // 先判断websocket连接是否成功
      if ((wsRes === null || wsRes === void 0 ? void 0 : wsRes.op) === OpCode.HELLO && wsRes !== null && wsRes !== void 0 && (_wsRes$d = wsRes.d) !== null && _wsRes$d !== void 0 && _wsRes$d.heartbeat_interval) {
        var _wsRes$d2;
        // websocket连接成功，拿到心跳周期
        this.heartbeatInterval = wsRes === null || wsRes === void 0 || (_wsRes$d2 = wsRes.d) === null || _wsRes$d2 === void 0 ? void 0 : _wsRes$d2.heartbeat_interval;
        // 非断线重连时，需要鉴权
        this.isReconnect ? this.reconnectWs() : this.authWs();
        return;
      }
      // 鉴权通过
      if (wsRes.t === SessionEvents.READY) {
        // console.log(`[CLIENT] 鉴权通过`);
        const {
          d,
          s
        } = wsRes;
        const {
          session_id
        } = d;
        // 获取当前会话参数
        if (session_id && s) {
          this.sessionRecord.sessionID = session_id;
          this.sessionRecord.seq = s;
          this.heartbeatParam.d = s;
        }
        this.event.emit(SessionEvents.READY, {
          eventType: SessionEvents.READY,
          msg: d || ''
        });
        // 第一次发送心跳
        // console.log(`[CLIENT] 发送第一次心跳`, this.heartbeatParam);
        this.sendWs(this.heartbeatParam);
        return;
      }
      // 心跳测试
      if (wsRes.op === OpCode.HEARTBEAT_ACK || wsRes.t === SessionEvents.RESUMED) {
        if (!this.alive) {
          this.alive = true;
          this.event.emit(SessionEvents.EVENT_WS, {
            eventType: SessionEvents.READY
          });
        }
        // console.log('[CLIENT] 心跳校验', this.heartbeatParam);
        this.heartbeatTimeout = setTimeout(() => {
          this.sendWs(this.heartbeatParam);
        }, this.heartbeatInterval);
      }
      // 收到服务端锻炼重连的通知
      if (wsRes.op === OpCode.RECONNECT) {
        // 通知会话，当前已断线
        this.event.emit(SessionEvents.EVENT_WS, {
          eventType: SessionEvents.RECONNECT
        });
      }
      // 服务端主动推送的消息
      if (wsRes.op === OpCode.DISPATCH) {
        // 更新心跳唯一值
        const {
          s
        } = wsRes;
        if (s) {
          this.sessionRecord.seq = s;
          this.heartbeatParam.d = s;
        }
        // OpenAPI事件分发
        this.dispatchEvent(wsRes.t, wsRes);
      }
    });
    // 监听websocket关闭事件
    this.ws.on('close', data => {
      // console.log('[CLIENT] 连接关闭', data);
      // 通知会话，当前已断线
      this.alive = false;
      this.event.emit(SessionEvents.EVENT_WS, {
        eventType: SessionEvents.DISCONNECT,
        eventMsg: this.sessionRecord,
        code: data
      });
      if (data) {
        this.handleWsCloseEvent(data);
      }
    });
    // 监听websocket错误
    this.ws.on('error', () => {
      // console.log(`[CLIENT] 连接错误`);
      this.event.emit(SessionEvents.CLOSED, {
        eventType: SessionEvents.CLOSED
      });
    });
    return this.ws;
  }
  // 连接ws
  connectWs(wsData) {
    // 创建websocket连接
    this.ws = new WebSocket(wsData.url);
  }
  // 鉴权
  authWs() {
    // 鉴权参数
    const authOp = {
      op: OpCode.IDENTIFY,
      // 鉴权参数
      d: {
        token: `Bot ${this.config.appID}.${this.config.token}`,
        // 根据配置转换token
        intents: this.getValidIntents(),
        // todo 接受的类型
        shard: this.checkShards(this.config.shards) || [0, 1],
        // 分片信息,给一个默认值
        properties: {
          $os: Properties.os,
          $browser: Properties.browser,
          $device: Properties.device
        }
      }
    };
    // 发送鉴权请求
    this.sendWs(authOp);
  }
  // 校验intents类型
  getValidIntents() {
    // 判断用户有没有给到需要监听的事件类型
    const intentsIn = this.getValidIntentsType();
    if (intentsIn.length > 0) {
      const intents = {
        value: 0
      };
      if (intentsIn.length === 1) {
        intents.value = IntentEvents[intentsIn[0]];
        return intents.value;
      }
      intentsIn.forEach(e => {
        intents.value = IntentEvents[e] | intents.value;
      });
      return intents.value;
    }
  }
  // 校验intents格式
  getValidIntentsType() {
    const intentsIn = this.config.intents;
    // 全部可监听事件
    const defaultIntents = Object.keys(AvailableIntentsEventsEnum);
    // 如果开发者没传intents，我们默认给他开启全部监听事件
    if (!intentsIn) {
      // console.log('[CLIENT] intents不存在，默认开启全部监听事件');
      return defaultIntents;
    }
    // 如果开发者传入intents为空数组，我们默认给他开启全部监听事件
    if (intentsIn.length === 0) {
      // console.log('[CLIENT] intents为空，默认开启全部监听事件');
      return defaultIntents;
    }
    // 如果intents大于可监听数
    if (intentsIn.length > defaultIntents.length) ;
    // 如果intents中数据格式不对
    const typeIn = intentsIn.every(item => typeof item === 'string');
    if (!typeIn) {
      // console.log('[CLIENT] intents中存在不合法类型，仅开启有效监听事件');
      return intentsIn.filter(item => typeof item === 'string');
    }
    return intentsIn;
  }
  // 校验shards
  checkShards(shardsArr) {
    // 没有传shards进来
    if (!shardsArr) {
      // return console.log('shards 不存在');
      return;
    }
    // 传进来的符合要求
    if (Array.isArray(shardsArr) && shardsArr.length === 2 && shardsArr[0] < shardsArr[1]) {
      return shardsArr;
    }
    // return console.log('shards 错误');
    return;
  }
  // 发送websocket
  sendWs(msg) {
    try {
      // 先将消息转为字符串
      this.ws.send(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } catch (e) {
      // console.log(e);
    }
  }
  // 重新连接
  reconnect() {
    // console.log('[CLIENT] 等待断线重连');
  }
  // 重新重连Ws
  reconnectWs() {
    const reconnectParam = {
      op: OpCode.RESUME,
      d: {
        token: `Bot ${this.config.appID}.${this.config.token}`,
        session_id: this.sessionRecord.sessionID,
        seq: this.sessionRecord.seq
      }
    };
    this.sendWs(reconnectParam);
  }
  // OpenAPI事件分发
  dispatchEvent(eventType, wsRes) {
    const msg = wsRes.d;
    // 如果没有事件，即刻退出
    if (!msg || !eventType) return;
    this.event.emit(WsEventType[eventType], {
      eventType,
      msg
    });
  }
  // 主动关闭会话
  closeWs() {
    clearTimeout(this.heartbeatTimeout);
    this.ws.close();
  }
  // ws关闭的原因
  handleWsCloseEvent(code) {
    WebsocketCloseReason.forEach(e => {
      if (e.code === code) {
        this.event.emit(SessionEvents.ERROR, {
          eventType: SessionEvents.ERROR,
          msg: e.reason
        });
      }
    });
  }
}
class Session {
  constructor(config, event, sessionRecord) {
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "heartbeatInterval", void 0);
    _defineProperty(this, "ws", void 0);
    _defineProperty(this, "event", void 0);
    _defineProperty(this, "sessionRecord", void 0);
    this.config = config;
    this.event = event;
    // 如果会话记录存在的话，继续透传
    if (sessionRecord) {
      this.sessionRecord = sessionRecord;
    }
    this.createSession();
  }
  // 新建会话
  createSession() {
    this.ws = new Ws(this.config, this.event, this.sessionRecord || undefined);
    // 拿到 ws地址等信息
    const reqOptions = WsObjRequestOptions(this.config.sandbox);
    // @ts-ignore
    addAuthorization(reqOptions.headers, this.config.appID, this.config.token);
    resty.create(reqOptions).get(reqOptions.url, {}).then(r => {
      const wsData = r.data;
      if (!wsData) throw new Error('获取ws连接信息异常');
      this.ws.createWebsocket(wsData);
    }).catch(e => {
      console.log('[ERROR] createSession: ', e);
      this.event.emit(SessionEvents.EVENT_WS, {
        eventType: SessionEvents.DISCONNECT,
        eventMsg: this.sessionRecord
      });
    });
  }
  // 关闭会话
  closeSession() {
    this.ws.closeWs();
  }
}
const MAX_RETRY = 10;
class WebsocketClient extends WebSocket.EventEmitter {
  constructor(config) {
    super();
    _defineProperty(this, "session", void 0);
    _defineProperty(this, "retry", 0);
    this.connect(config);
    this.on(SessionEvents.EVENT_WS, data => {
      switch (data.eventType) {
        case SessionEvents.RECONNECT:
          // console.log('[CLIENT] 等待断线重连中...');
          break;
        case SessionEvents.DISCONNECT:
          if (this.retry < (config.maxRetry || MAX_RETRY)) {
            var _WebsocketCloseReason;
            // console.log('[CLIENT] 重新连接中，尝试次数：', this.retry + 1);
            this.connect(config, (_WebsocketCloseReason = WebsocketCloseReason.find(v => v.code === data.code)) !== null && _WebsocketCloseReason !== void 0 && _WebsocketCloseReason.resume ? data.eventMsg : null);
            this.retry += 1;
          } else {
            // console.log('[CLIENT] 超过重试次数，连接终止');
            this.emit(SessionEvents.DEAD, {
              eventType: SessionEvents.ERROR,
              msg: '连接已死亡，请检查网络或重启'
            });
          }
          break;
        case SessionEvents.READY:
          // console.log('[CLIENT] 连接成功');
          this.retry = 0;
          break;
      }
    });
  }
  // 连接
  connect(config, sessionRecord) {
    const event = this;
    // 新建一个会话
    this.session = new Session(config, event, sessionRecord);
    return this.session;
  }
  // 断开连接
  disconnect() {
    this.retry = 0;
    this.session.ws.ws.removeAllListeners();
    this.session.ws.event.removeAllListeners();
    this.removeAllListeners();
    this.connect = () => {};
    // 关闭会话
    this.session.closeSession();
  }
}

// 注册v1接口
v1Setup();
let defaultImpl = versionMapping[apiVersion];
// 如果需要使用其他版本的实现，需要在调用这个方法之前调用 SelectOpenAPIVersion 方法
function createOpenAPI(config) {
  return defaultImpl.newClient(config);
}
// ws连接新建
function createWebsocket(config) {
  return new WebsocketClient(config);
}
var _sign = /*#__PURE__*/new WeakSet();
class QqChannel {
  constructor({
    channelID,
    key
  }) {
    _classPrivateMethodInitSpec(this, _sign);
    _defineProperty(this, "_CONFIG", void 0);
    _defineProperty(this, "channelID", void 0);
    const $key = {
      channelID,
      ...key
    };
    if (!key) {
      throw new Error('Missing Parameter: key');
    }
    if (!$key.channelID) {
      throw new Error('Missing Parameter: channelID');
    }
    this._CONFIG = key;
    this.channelID = $key.channelID;
  }
  async send(sendOptions) {
    if (!sendOptions.message && !sendOptions.customOptions) {
      return {
        status: 0,
        statusText: 'Missing Parameter: message',
        extraMessage: null
      };
    }
    let qqChannelOptions;
    if (sendOptions.customOptions) {
      qqChannelOptions = sendOptions.customOptions;
    } else {
      if (!sendOptions.type || sendOptions.type === 'text') {
        qqChannelOptions = {
          content: sendOptions.message
        };
      } else {
        return {
          status: 103,
          statusText: 'Options Format Error',
          extraMessage: sendOptions
        };
      }
    }
    if (!this.channelID) {
      return {
        status: 0,
        statusText: 'Missing Parameter: channelID',
        extraMessage: null
      };
    }
    if (sendOptions.extraOptions) {
      qqChannelOptions = {
        ...qqChannelOptions,
        ...sendOptions.extraOptions
      };
    }
    const client = createOpenAPI(this._CONFIG);
    const ws = await _classPrivateMethodGet(this, _sign, _sign2).call(this).then(ws => ws).catch(error => ({
      status: 140,
      statusText: 'Check Sign Failed',
      extraMessage: error
    }));
    if (ws.status === 140) {
      return ws;
    }
    // console.log(ws.session.ws.ws.close());
    return client.messageApi.postMessage(this.channelID, qqChannelOptions).then(response => {
      ws.disconnect();
      if (response.data) {
        // @ts-ignore
        if (!response.data.code) {
          return {
            status: 200,
            statusText: 'Success',
            extraMessage: response
          };
        }
        // @ts-ignore
        if (response.data.code === 304023) {
          return {
            status: 201,
            statusText: 'Waiting',
            extraMessage: response
          };
        }
        return {
          status: 100,
          statusText: 'Error',
          extraMessage: response
        };
      }
      return {
        status: 101,
        statusText: 'No Response Data',
        extraMessage: response
      };
    }).catch(error => {
      ws.disconnect();
      return {
        status: 102,
        statusText: 'Request Error',
        extraMessage: error
      };
    });
  }
}
async function _sign2() {
  return new Promise((resolve, reject) => {
    const ws = createWebsocket({
      ...this._CONFIG,
      maxRetry: 3
    });
    ws.on('READY', () => {
      resolve(ws);
    });
    ws.on('ERROR', data => {
      reject(data);
    });
  });
}
exports.QqChannel = QqChannel;
