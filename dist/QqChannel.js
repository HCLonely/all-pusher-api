'use strict';

var _defineProperty = require("@babel/runtime/helpers/defineProperty");

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

Object.defineProperty(exports, '__esModule', {
  value: true
});

var resty = require('resty-client');

var WebSocket = require('ws');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var resty__default = /*#__PURE__*/_interopDefaultLegacy(resty);

var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);

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
  } // ??????????????????


  pinsMessage(channelID) {
    const options = {
      method: 'GET',
      url: getURL('pinsMessageURI'),
      rest: {
        channelID
      }
    };
    return this.request(options);
  } // ??????????????????


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
  } // ??????????????????


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
  } // ??????????????????


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
  } // ??????????????????


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
  } // ??????????????????


  guild(guildID) {
    const options = {
      method: 'GET',
      url: getURL('guildURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  } // ????????????????????????


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
  } // ????????????????????????


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
  } // ????????????????????????


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

var version = "2.9.1"; // ????????????

const toObject = data => {
  if (Buffer.isBuffer(data)) return JSON.parse(data.toString());
  if (typeof data === 'object') return data;
  if (typeof data === 'string') return JSON.parse(data); // return String(data);
}; // ??????number?????????10????????????


const getTimeStampNumber = () => Number(new Date().getTime().toString().substr(0, 10)); // ?????? User-Agent


const addUserAgent = header => {
  const sdkVersion = version;
  header['User-Agent'] = `BotNodeSDK/v${sdkVersion}`;
}; // ?????? User-Agent


const addAuthorization = (header, appID, token) => {
  header['Authorization'] = `Bot ${appID}.${token}`;
}; // ????????????Url


const buildUrl = (path = '', isSandbox) => {
  return `${isSandbox ? 'https://sandbox.api.sgroup.qq.com' : 'https://api.sgroup.qq.com'}${path}`;
};

class Channel {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);

    _defineProperty(this, "config", void 0);

    this.request = request;
    this.config = config;
  } // ?????????????????????


  channel(channelID) {
    const options = {
      method: 'GET',
      url: getURL('channelURI'),
      rest: {
        channelID
      }
    };
    return this.request(options);
  } // ?????????????????????????????????


  channels(guildID) {
    const options = {
      method: 'GET',
      url: getURL('channelsURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  } // ???????????????


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
  } // ?????????????????????


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
  } // ?????????????????????


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
  } // ????????????????????????


  me() {
    const options = {
      method: 'GET',
      url: getURL('userMeURI')
    };
    return this.request(options);
  } // ??????????????????????????????


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
  } // ??????????????????


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
  } // ??????????????????


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
  } // ????????????


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
  } // ????????????


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
  } // ???????????????????????????


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
  } // ???????????????????????????


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

} // ?????????filter???0 1 ?????????????????? 0-??? 1-???


const defaultFilter = {
  name: 1,
  color: 1,
  hoist: 1
}; // ????????????????????????

const defaultColor = 4278245297;

class Role {
  constructor(request, config) {
    _defineProperty(this, "request", void 0);

    _defineProperty(this, "config", void 0);

    this.request = request;
    this.config = config;
  } // ???????????????????????????


  roles(guildID) {
    const options = {
      method: 'GET',
      url: getURL('rolesURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  } // ?????????????????????


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
  } // ?????????????????????


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
  } // ?????????????????????


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
  } // ??????????????????


  createDirectMessage(dm) {
    const options = {
      method: 'POST',
      url: getURL('userMeDMURI'),
      data: dm
    };
    return this.request(options);
  } // ???????????????????????????


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
  } // ??????????????????????????????


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
  } // ??????????????????????????????


  putChannelPermissions(channelID, userID, p) {
    try {
      // ????????????
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
  } // ???????????????????????????????????????


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
  } // ???????????????????????????????????????


  putChannelRolePermissions(channelID, roleID, p) {
    try {
      // ????????????
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
  } // ????????????????????????????????????


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
  } // ????????????member


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
  } // ???????????????


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
  } // ??????guild??????


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
  } // ??????guild??????


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
  } // ?????????????????????????????????


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
  } // ??????channel??????


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
  } // ??????channel??????


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
  } // ??????????????????


  schedules(channelID, since) {
    if (since && since.length !== 13) {
      return Promise.reject(new Error("Param 'since' is invalid, millisecond timestamp expected???"));
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
  } // ????????????


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
  } // ????????????


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
  } // ????????????


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
  } // ????????????


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
  } // ??????????????????????????????


  permissions(guildID) {
    const options = {
      method: 'GET',
      url: getURL('guildPermissionURI'),
      rest: {
        guildID
      }
    };
    return this.request(options);
  } // ???????????? API ????????????????????????


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
    // ????????????client
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
  } // ??????rest??????


  request(options) {
    const {
      appID,
      token
    } = this.config;
    options.headers = { ...options.headers
    }; // ?????? UA

    addUserAgent(options.headers); // ??????????????????

    addAuthorization(options.headers, appID, token); // ????????????Url

    const botUrl = buildUrl(options.url, this.config.sandbox); // ????????????????????????????????????????????????????????????????????????????????????

    resty__default["default"].useRes(result => result, error => {
      var _error$response, _error$response$heade, _error$response2;

      let traceid = error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : (_error$response$heade = _error$response.headers) === null || _error$response$heade === void 0 ? void 0 : _error$response$heade['x-tps-trace-id'];

      if (error !== null && error !== void 0 && (_error$response2 = error.response) !== null && _error$response2 !== void 0 && _error$response2.data) {
        return Promise.reject({ ...error.response.data,
          traceid
        });
      }

      if (error !== null && error !== void 0 && error.response) {
        return Promise.reject({ ...error.response,
          traceid
        });
      }

      return Promise.reject(error);
    });
    const client = resty__default["default"].create(options);
    return client.request(botUrl, options);
  }

}

function v1Setup() {
  register(apiVersion, OpenAPI);
} // ????????????


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
})(OpCode || (OpCode = {})); // ????????????intents????????????


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
})(AvailableIntentsEventsEnum || (AvailableIntentsEventsEnum = {})); // OpenAPI????????????????????????


const WsEventType = {
  //  ======= GUILDS ======
  GUILD_CREATE: AvailableIntentsEventsEnum.GUILDS,
  GUILD_UPDATE: AvailableIntentsEventsEnum.GUILDS,
  GUILD_DELETE: AvailableIntentsEventsEnum.GUILDS,
  CHANNEL_CREATE: AvailableIntentsEventsEnum.GUILDS,
  CHANNEL_UPDATE: AvailableIntentsEventsEnum.GUILDS,
  CHANNEL_DELETE: AvailableIntentsEventsEnum.GUILDS,
  //  ======= GUILD_MEMBERS ======
  GUILD_MEMBER_ADD: AvailableIntentsEventsEnum.GUILD_MEMBERS,
  GUILD_MEMBER_UPDATE: AvailableIntentsEventsEnum.GUILD_MEMBERS,
  GUILD_MEMBER_REMOVE: AvailableIntentsEventsEnum.GUILD_MEMBERS,
  //  ======= AUDIO_ACTION ======
  AUDIO_START: AvailableIntentsEventsEnum.AUDIO_ACTION,
  AUDIO_FINISH: AvailableIntentsEventsEnum.AUDIO_ACTION,
  AUDIO_ON_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION,
  AUDIO_OFF_MIC: AvailableIntentsEventsEnum.AUDIO_ACTION,
  //  ======= GUILD_MESSAGE_REACTIONS ======
  MESSAGE_REACTION_ADD: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS,
  MESSAGE_REACTION_REMOVE: AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS,
  //  ======= MESSAGE_AUDIT ======
  MESSAGE_AUDIT_PASS: AvailableIntentsEventsEnum.MESSAGE_AUDIT,
  MESSAGE_AUDIT_REJECT: AvailableIntentsEventsEnum.MESSAGE_AUDIT,
  //  ======= FORUM_EVENT ======
  THREAD_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  THREAD_UPDATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  POST_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  POST_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT,
  REPLY_CREATE: AvailableIntentsEventsEnum.FORUM_EVENT,
  REPLY_DELETE: AvailableIntentsEventsEnum.FORUM_EVENT,
  //  ======= DIRECT_MESSAGE ======
  DIRECT_MESSAGE_CREATE: AvailableIntentsEventsEnum.DIRECT_MESSAGE,
  //  ======= AT_MESSAGES ======
  AT_MESSAGE_CREATE: AvailableIntentsEventsEnum.AT_MESSAGES,
  //  ======= GUILD_MESSAGES ======
  MESSAGE_CREATE: AvailableIntentsEventsEnum.GUILD_MESSAGES // ????????????????????????????????????

}; // websocket????????????

const WebsocketCloseReason = [{
  code: 4001,
  reason: '?????????opcode'
}, {
  code: 4002,
  reason: '?????????payload'
}, {
  code: 4007,
  reason: 'seq??????'
}, {
  code: 4008,
  reason: '?????? payload ??????????????????????????????????????????????????????????????????',
  resume: true
}, {
  code: 4009,
  reason: '????????????????????????',
  resume: true
}, {
  code: 4010,
  reason: '?????????shard'
}, {
  code: 4011,
  reason: '?????????????????????guild??????????????????????????????'
}, {
  code: 4012,
  reason: '?????????version'
}, {
  code: 4013,
  reason: '?????????intent'
}, {
  code: 4014,
  reason: 'intent?????????'
}, {
  code: 4900,
  reason: '????????????????????????'
}, {
  code: 4914,
  reason: '??????????????????,???????????????????????????,???????????????,????????????????????????'
}, {
  code: 4915,
  reason: '??????????????????,???????????????,???????????????,????????????????????????'
}]; // ???????????????intents??????

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
}; // Session??????

const SessionEvents = {
  CLOSED: 'CLOSED',
  READY: 'READY',
  ERROR: 'ERROR',
  INVALID_SESSION: 'INVALID_SESSION',
  RECONNECT: 'RECONNECT',
  DISCONNECT: 'DISCONNECT',
  EVENT_WS: 'EVENT_WS',
  RESUMED: 'RESUMED',
  DEAD: 'DEAD' // ??????????????????????????????????????????

}; // ws????????????

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
}); // ????????????
// ????????????????????????????????????????????????????????????


const Properties = {
  os: 'linux',
  browser: 'my_library',
  device: 'my_library'
}; // websocket??????

class Ws {
  // ????????????????????????????????????
  // ????????????????????????????????????????????????????????????????????????
  // ??????????????????
  constructor(config, event, sessionRecord) {
    _defineProperty(this, "ws", void 0);

    _defineProperty(this, "event", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "heartbeatInterval", void 0);

    _defineProperty(this, "heartbeatParam", {
      op: OpCode.HEARTBEAT,
      d: null // ???????????????

    });

    _defineProperty(this, "isReconnect", void 0);

    _defineProperty(this, "sessionRecord", {
      sessionID: '',
      seq: 0
    });

    _defineProperty(this, "alive", false);

    _defineProperty(this, "heartbeatTimeout", void 0);

    this.config = config;
    this.isReconnect = false;
    this.event = event; // ???????????????????????????????????????????????????????????????????????????

    if (sessionRecord) {
      this.sessionRecord.sessionID = sessionRecord.sessionID;
      this.sessionRecord.seq = sessionRecord.seq;
      this.isReconnect = true;
    }
  } // ????????????websocket??????


  createWebsocket(wsData) {
    // ????????????ws
    this.connectWs(wsData); // ?????????????????????

    return this.createListening();
  } // ????????????


  createListening() {
    // websocket???????????????
    this.ws.on('open', () => {// console.log(`[CLIENT] ??????`);
    }); // ????????????

    this.ws.on('message', data => {
      var _wsRes$d;

      // console.log(`[CLIENT] ????????????: ${data}`);
      // ??????????????????
      const wsRes = toObject(data); // ?????????websocket??????????????????

      if ((wsRes === null || wsRes === void 0 ? void 0 : wsRes.op) === OpCode.HELLO && wsRes !== null && wsRes !== void 0 && (_wsRes$d = wsRes.d) !== null && _wsRes$d !== void 0 && _wsRes$d.heartbeat_interval) {
        var _wsRes$d2;

        // websocket?????????????????????????????????
        this.heartbeatInterval = wsRes === null || wsRes === void 0 ? void 0 : (_wsRes$d2 = wsRes.d) === null || _wsRes$d2 === void 0 ? void 0 : _wsRes$d2.heartbeat_interval; // ?????????????????????????????????

        this.isReconnect ? this.reconnectWs() : this.authWs();
        return;
      } // ????????????


      if (wsRes.t === SessionEvents.READY) {
        // console.log(`[CLIENT] ????????????`);
        const {
          d,
          s
        } = wsRes;
        const {
          session_id
        } = d; // ????????????????????????

        if (session_id && s) {
          this.sessionRecord.sessionID = session_id;
          this.sessionRecord.seq = s;
          this.heartbeatParam.d = s;
        }

        this.event.emit(SessionEvents.READY, {
          eventType: SessionEvents.READY,
          msg: d || ''
        }); // ?????????????????????
        // console.log(`[CLIENT] ?????????????????????`, this.heartbeatParam);

        this.sendWs(this.heartbeatParam);
        return;
      } // ????????????


      if (wsRes.op === OpCode.HEARTBEAT_ACK || wsRes.t === SessionEvents.RESUMED) {
        if (!this.alive) {
          this.alive = true;
          this.event.emit(SessionEvents.EVENT_WS, {
            eventType: SessionEvents.READY
          });
        } // console.log('[CLIENT] ????????????', this.heartbeatParam);


        this.heartbeatTimeout = setTimeout(() => {
          this.sendWs(this.heartbeatParam);
        }, this.heartbeatInterval);
      } // ????????????????????????????????????


      if (wsRes.op === OpCode.RECONNECT) {
        // ??????????????????????????????
        this.event.emit(SessionEvents.EVENT_WS, {
          eventType: SessionEvents.RECONNECT
        });
      } // ??????????????????????????????


      if (wsRes.op === OpCode.DISPATCH) {
        // ?????????????????????
        const {
          s
        } = wsRes;

        if (s) {
          this.sessionRecord.seq = s;
          this.heartbeatParam.d = s;
        } // OpenAPI????????????


        this.dispatchEvent(wsRes.t, wsRes);
      }
    }); // ??????websocket????????????

    this.ws.on('close', data => {
      // console.log('[CLIENT] ????????????', data);
      // ??????????????????????????????
      this.alive = false;
      this.event.emit(SessionEvents.EVENT_WS, {
        eventType: SessionEvents.DISCONNECT,
        eventMsg: this.sessionRecord,
        code: data
      });

      if (data) {
        this.handleWsCloseEvent(data);
      }
    }); // ??????websocket??????

    this.ws.on('error', () => {
      // console.log(`[CLIENT] ????????????`);
      this.event.emit(SessionEvents.CLOSED, {
        eventType: SessionEvents.CLOSED
      });
    });
    return this.ws;
  } // ??????ws


  connectWs(wsData) {
    // ??????websocket??????
    this.ws = new WebSocket__default["default"](wsData.url);
  } // ??????


  authWs() {
    // ????????????
    const authOp = {
      op: OpCode.IDENTIFY,
      d: {
        token: `Bot ${this.config.appID}.${this.config.token}`,
        intents: this.getValidIntents(),
        shard: this.checkShards(this.config.shards) || [0, 1],
        properties: {
          $os: Properties.os,
          $browser: Properties.browser,
          $device: Properties.device
        }
      }
    }; // ??????????????????

    this.sendWs(authOp);
  } // ??????intents??????


  getValidIntents() {
    // ??????????????????????????????????????????????????????
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
  } // ??????intents??????


  getValidIntentsType() {
    const intentsIn = this.config.intents; // ?????????????????????

    const defaultIntents = Object.keys(AvailableIntentsEventsEnum); // ?????????????????????intents?????????????????????????????????????????????

    if (!intentsIn) {
      // console.log('[CLIENT] intents??????????????????????????????????????????');
      return defaultIntents;
    } // ?????????????????????intents?????????????????????????????????????????????????????????


    if (intentsIn.length === 0) {
      // console.log('[CLIENT] intents???????????????????????????????????????');
      return defaultIntents;
    } // ??????intents??????????????????


    if (intentsIn.length > defaultIntents.length) ; // ??????intents?????????????????????

    const typeIn = intentsIn.every(item => typeof item === 'string');

    if (!typeIn) {
      // console.log('[CLIENT] intents??????????????????????????????????????????????????????');
      return intentsIn.filter(item => typeof item === 'string');
    }

    return intentsIn;
  } // ??????shards


  checkShards(shardsArr) {
    // ?????????shards??????
    if (!shardsArr) {
      // return console.log('shards ?????????');
      return;
    } // ????????????????????????


    if (Array.isArray(shardsArr) && shardsArr.length === 2 && shardsArr[0] < shardsArr[1]) {
      return shardsArr;
    } // return console.log('shards ??????');


    return;
  } // ??????websocket


  sendWs(msg) {
    try {
      // ???????????????????????????
      this.ws.send(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } catch (e) {// console.log(e);
    }
  } // ????????????


  reconnect() {// console.log('[CLIENT] ??????????????????');
  } // ????????????Ws


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
  } // OpenAPI????????????


  dispatchEvent(eventType, wsRes) {
    const msg = wsRes.d; // ?????????????????????????????????

    if (!msg || !eventType) return;
    this.event.emit(WsEventType[eventType], {
      eventType,
      msg
    });
  } // ??????????????????


  closeWs() {
    clearTimeout(this.heartbeatTimeout);
    this.ws.close();
  } // ws???????????????


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
    this.event = event; // ?????????????????????????????????????????????

    if (sessionRecord) {
      this.sessionRecord = sessionRecord;
    }

    this.createSession();
  } // ????????????


  createSession() {
    this.ws = new Ws(this.config, this.event, this.sessionRecord || undefined); // ?????? ws???????????????

    const reqOptions = WsObjRequestOptions(this.config.sandbox);
    addAuthorization(reqOptions.headers, this.config.appID, this.config.token);
    resty__default["default"].create(reqOptions).get(reqOptions.url, {}).then(r => {
      const wsData = r.data;
      if (!wsData) throw new Error('??????ws??????????????????');
      this.ws.createWebsocket(wsData);
    }).catch(e => {
      console.log('[ERROR] createSession: ', e);
      this.event.emit(SessionEvents.EVENT_WS, {
        eventType: SessionEvents.DISCONNECT,
        eventMsg: this.sessionRecord
      });
    });
  } // ????????????


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
          // console.log('[CLIENT] ?????????????????????...');
          break;

        case SessionEvents.DISCONNECT:
          if (this.retry < (config.maxRetry || MAX_RETRY)) {
            var _WebsocketCloseReason;

            // console.log('[CLIENT] ?????????????????????????????????', this.retry + 1);
            this.connect(config, (_WebsocketCloseReason = WebsocketCloseReason.find(v => v.code === data.code)) !== null && _WebsocketCloseReason !== void 0 && _WebsocketCloseReason.resume ? data.eventMsg : null);
            this.retry += 1;
          } else {
            // console.log('[CLIENT] ?????????????????????????????????');
            this.emit(SessionEvents.DEAD, {
              eventType: SessionEvents.ERROR,
              msg: '??????????????????????????????????????????'
            });
          }

          break;

        case SessionEvents.READY:
          // console.log('[CLIENT] ????????????');
          this.retry = 0;
          break;
      }
    });
  } // ??????


  connect(config, sessionRecord) {
    const event = this; // ??????????????????

    this.session = new Session(config, event, sessionRecord);
    return this.session;
  } // ????????????


  disconnect() {
    this.retry = 0;
    this.session.ws.ws.removeAllListeners();
    this.session.ws.event.removeAllListeners();
    this.removeAllListeners();

    this.connect = () => {}; // ????????????


    this.session.closeSession();
  }

} // ??????v1??????


v1Setup();
let defaultImpl = versionMapping[apiVersion]; // ????????????????????????????????????????????????????????????????????????????????? SelectOpenAPIVersion ??????

function createOpenAPI(config) {
  return defaultImpl.newClient(config);
} // ws????????????


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
      qqChannelOptions = { ...qqChannelOptions,
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
    } // console.log(ws.session.ws.ws.close());


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
        } // @ts-ignore


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
    const ws = createWebsocket({ ...this._CONFIG,
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
