# all-pusher-api

统一化推送服务Nodejs API. 已支持钉钉, Discord, 邮件, 飞书, PushDeer, PushPlus, QQ, QQ 频道机器人, Server 酱, Showdoc Push, Telegram Bot, 企业微信群机器人, 息知, WxPusher, NowPush, iGot, Chanify, Bark等平台.

**！！！！！仅推送！！！！！不交互！！！！！！**

## 已支持平台

- [QQ(go-cqhttp)](https://github.com/Mrs4s/go-cqhttp)
- [QQ(Qmsg)](https://qmsg.zendee.cn/api)
- [QQ 频道机器人](https://bot.q.qq.com/wiki/develop/api/openapi/message/post_messages.html)
- [钉钉群机器人](https://developers.dingtalk.com/document/app/custom-robot-access)
- [Discord](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)
- [邮件](https://nodemailer.com/)
- [飞书群机器人](https://www.feishu.cn/hc/zh-CN/articles/360024984973)
- [企业微信](https://open.work.weixin.qq.com/api/doc/90000/90136/91770)
- [企业微信群机器人](https://developer.work.weixin.qq.com/document/path/91770)
- [Telegram Bot](https://core.telegram.org/bots/api#sendmessage)
- [PushDeer](http://pushdeer.com)
- [PushPlus](https://pushplus.hxtrip.com/index)
- [Server 酱](https://sct.ftqq.com)
- [Showdoc Push](https://push.showdoc.com.cn/#/)
- [息知](https://xz.qqoq.net/#/index)
- [WxPusher](https://wxpusher.zjiecode.com/docs/)
- [NowPush](https://www.nowpush.app/index.html)
- [iGot](http://hellyw.com/)
- [Chanify](https://github.com/chanify/chanify-ios)
- [Bark](https://github.com/Finb/Bark)
- [GoogleChat](https://developers.google.com/chat/how-tos/webhooks)

## 安装

```shell
npm install all-pusher-api -S
```

## 使用

### Example

#### 多平台推送

```javascript
const { PushApi } = require('all-pusher-api'); // 多平台同时推送

(async () => {
  console.log((await new PushApi([
    {
      name: 'ServerChanTurbo',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'PushDeer',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'WxPusher',
      config: {
        key: {
          token: '******',
          uids: ['******']
        }
      }
    },
    {
      name: 'PushPlus',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'Showdoc',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'Xizhi',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'QqChannel',
      config: {
        key: {
          appID: '******',
          token: '******'
        },
        channelID: '******'
      }
    },
    {
      name: 'WorkWeixin',
      config: {
        corpid: '******',
        secret: '******',
        agentid: ******,
        touser: '******'
      }
    },
    {
      name: 'Mail',
      config: {
        key: {
          host: '******',
          port: 465,
          secure: true,
          auth: {
            user: '******',
            pass: '******'
          }
        },
        options: {
          from: '******',
          to: '******'
        }
      }
    },
    {
      name: 'TelegramBot',
      config: {
        token: '******',
        chat_id: '******'
      }
    },
    {
      name: 'DingTalk',
      config: {
        key: {
          token: '******',
          secret: '******'
        }
      }
    },
    {
      name: 'FeiShu',
      config: {
        key: {
          token: '******',
          secret: '******'
        }
      }
    },
    {
      name: 'Discord',
      config: {
        webhook: '******',
        proxy: {
          host: '127.0.0.1',
          port: 1080
        }
      }
    },
    {
      name: 'GoCqhttp',
      config: {
        key: {
          token: '******',
          baseUrl: 'http://127.0.0.1:5700',
          user_id: '******'
        }
      }
    },
    {
      name: 'NowPush',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'IGot',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'Qmsg',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'WorkWeixinBot',
      config: {
        key: {
          webhook: '******'
        }
      }
    },
    {
      name: 'Chanify',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'Bark',
      config: {
        key: {
          token: '******'
        }
      }
    },
    {
      name: 'GoogleChat',
      config: {
        key: {
          webhook: '******'
        },
        proxy: {
          host: '127.0.0.1',
          port: 1080
        }
      }
    }
  ])
    .send({ message: '测试文本' })).map((e) => (e.result.status >= 200 && e.result.status < 300) ? `${e.name} 测试成功` : e));
})();
```

#### 单平台推送

```javascript
(async () => {
  // Example 1
  const { PushApi } = require('all-pusher-api'); // 多平台同时推送

  const result = await new PushApi([
    {
      name: 'ServerChanTurbo',
      config: {
        key: {
          token: '******'
        }
      }
    }
  ])
    .send({ message: '测试文本' });
  console.log(result.map((e) => (e.result.status >= 200 && e.result.status < 300) ? `${e.name} 测试成功` : e));

  // Example 2
  const { WxPusher } = require('all-pusher-api/dist/WxPusher'); // 单平台推送可选

  const wxPusherResult = await new WxPusher({
    token: '******',
    uids: ['******']
  })
    .send({ message: '测试文本' });
  console.log(wxPusherResult);
})();
```

#### extraOptions

```javascript
(async () => {
  const { DingTalk } = require('all-pusher-api/dist/DingTalk');

  const result = await new DingTalk({
    key: {
      token: '******',
      secret: '******'
    }
  })
    .send({
      message: '这条消息@了所有人',
      extraOptions: {
        isAtAll: true
      }
    });
  console.log(result);
})();
```

#### customOptions

> 这里以钉钉为例

```javascript
(async () => {
  const { DingTalk } = require('all-pusher-api/dist/DingTalk');

  const result = await new DingTalk({
    key: {
      token: '******',
      secret: '******'
    }
  })
    .send({
      customOptions: {
        "msgtype": "actionCard",
        "actionCard": {
          "title": "我 20 年前想打造一间苹果咖啡厅, 而它正是 Apple Store 的前身",
          "text": "![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n\n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化, 而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划",
          "btnOrientation": "0",
          "btns": [
            {
                "title": "内容不错",
                "actionURL": "https://www.dingtalk.com/"
            },
            {
                "title": "不感兴趣",
                "actionURL": "https://www.dingtalk.com/"
            }
          ]
        }
      }
    });
  console.log(result);
})();
```

#### 自定义接口

```javascript
(async () => {
  const { Custom } = require('all-pusher-api/dist/Custom'); // 自定义接口只能通过此方法引入
  const { createHmac } = require('crypto');
 const sign = () => {
    const timestamp = new Date().getTime();
    const secret = '******';
    const stringToSign = `${timestamp}\n${secret}`;
    const hash = createHmac('sha256', secret)
      .update(stringToSign, 'utf8')
      .digest();
    return `timestamp=${timestamp}&sign=${encodeURIComponent(hash.toString('base64'))}`;
  };
  console.log(await new Custom({
    url: `https://oapi.dingtalk.com/robot/send?access_token=******&${sign()}`,
    success: {
      key: 'responseData.errcode',
      value: 0
    }
  }).send({
    msgtype: 'text',
    text: {
      content: '测试文本'
    }
  }));
  /* 返回值
  {
    status: 200,
    statusText: 'Success',
    extraMessage: <AxiosResponse>
  }
  */
});
```

### 参数

#### pusherConfig

> const pusher = new WxPusher(*pusherConfig*);

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `token` | `string` | `null` | 大部分平台的授权token, 如果有授权信息有多个, 请使用`key` |
| `baseUrl` | `string` | `null` | 对于部分支持搭建服务端的平台, 如果使用自建服务端, 需配置此选项 |
| `webhook` | `string` | `null` | `Discord`, `企业微信机器人`和`GoogleChat` 的 webhook 地址, 该平台请使用`webhook`而不是`token` |
| `chat_id` | `string` | `null` | Telegram 平台的 chat_id |
| `baseUrl` | `string` | `null` | go-cqhttp 的http通信地址, 以`http://`或`https://`开头 |
| `user_id` | `number` | `null` | 使用 go-cqhttp 推送时的目标 QQ 号, 此参数与`group_id`, `channel_id`二选一 |
| `group_id` | `number` | `null` | 使用 go-cqhttp 推送时的目标群号, 此参数与`user_id`, `channel_id`二选一 |
| `channel_id` | `string` | `null` | 使用 go-cqhttp 推送时的目标频道ID, 此参数与`user_id`, `group_id`二选一, 且必须与`guild_id`同时存在 |
| `guild_id` | `string` | `null` | 使用 go-cqhttp 推送时的目标子频道ID, 此参数必须与`channel_id`同时存在 |
| `corpid` | `string` | `null` | 企业微信群机器人的[corpid](https://developer.work.weixin.qq.com/document/path/90665#corpid) |
| `agentid` | `string` | `null` | 企业微信群机器人的[agentid](https://developer.work.weixin.qq.com/document/path/90665#agentid) |
| `secret` | `string` | `null` | 钉钉、飞书加签的密钥[可选]/企业微信群机器人的[secret](https://developer.work.weixin.qq.com/document/path/90665#secret) |
| `touser` | `string` | `null` | 企业微信群机器人[指定接收消息的成员](https://developer.work.weixin.qq.com/document/path/90236#文本消息), 也可在[sendOptions](#sendOptions)中配置 |
| `uids` | `Array<string>` | `null` | WxPusher 发送目标的 UID, 也可在[sendOptions](#sendOptions)中配置 |
| `topicIds` | `Array<number>` | `null` | WxPusher 发送目标的 topicId, 也可在[sendOptions](#sendOptions)中配置 |
| `appID` | `string` | `null` | QQ频道机器人的 ID, 使用QQ频道推送时此选项为**必选** |
| `token` | `string` | `null` | QQ频道机器人的 token, 使用QQ频道推送时此选项为**必选** |
| `sandbox` | `boolean` | `false` | 使用QQ频道推送时是否启用沙箱, 可选 |
| `channelID` | `string` | `null` | QQ频道的子频道 ID, 使用QQ频道推送时此选项为**必选** |
| `key` | `object` | `null` | 以上参数都可以放到`key`中, [示例](#多平台推送) |
| - `key.host` | `string` | `null` | 邮件发送服务器地址, 使用邮件推送时此选项为**必选** |
| - `key.port` | `number` | `null` | 邮件发送服务器端口, 使用邮件推送时此选项为**必选** |
| - `key.secure` | `boolean` | `false` | 邮件发送服务器是否启用TLS/SSL, 可选 |
| - `key.auth` | `object` | `null` | 邮件发送服务器的验证信息, 使用邮件推送时此选项为**必选** |
|   - `key.auth.user` | `string` | `null` | 邮件发送服务器的用户名, 使用邮件推送时此选项为**必选** |
|   - `key.auth.pass` | `string` | `null` | 邮件发送服务器的密码, 使用邮件推送时此选项为**必选** |
| `proxy` | `object` | `null` | 代理配置, 可选, 部分支持 |
| - `proxy.protocol` | `string` | `'http'` | 代理协议 |
| - `proxy.host` | `string` | `null` | 代理主机地址 |
| - `proxy.port` | `number` | `null` | 代理端口 |
| - `proxy.username` | `string` | `null` | 代理用户名 |
| - `proxy.password` | `string` | `null` | 代理密码 |

#### CustomConfig

> 自定义接口
>
> const customPusher = new Custom(*CustomConfig*);

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `url` | `string` | `null` | 请求链接, 必需 |
| `method` | `string` | `'POST'` | 请求方式, 可选 |
| `contentType` | `string` | `'application/json'` | 发送的数据类型, 等同于`hreders['Content-type']` |
| `headers` | `AxiosRequestHeaders` | `null` | 请求头, 可选 |
| `success` | `object` | `null` | 推送成功的判断方式, 必需 |
| - `success.key` | `string` | `null` | [请看示例](#自定义接口) |
| - `success.value` | `any` | `null` | [请看示例](#自定义接口) |
| `key` | `object` | `null` | 以上参数都可以放到key中 |
| `proxy` | `object` | `null` | 代理配置, 同上 |

#### pushersConfig

> const pushers = new PushApi(*pushersConfig*);

```typescript
const pushersConfig: Array<{
  name: string,
  config: pusherConfig
}>
```

#### sendOptions

> const result = await pusher.send(*sendOptions*);

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `message` | `string` | `null` | 推送的消息内容, `message`与`customOptions`至少要有一个 |
| `title` | `string` | `null` | 部分平台支持消息标题, 不填则自动提取`message`第一行的前10个字符 |
| `type` | `string` | `'text'` | 仅支持`text`, `markdown`, `html`. 具体平台支持情况请查看[支持的消息类型](#支持消息类型) |
| `extraOptions` | `object` | `null` | 附加内容, 此对象中的内容会附加到请求体中, [示例](#extraOptions) |
| `customOptions` | `object` | `null` | 自定义请求内容, 推送时会POST`customOptions`, [示例](#customOptions) |

#### customSendOptions

> const result = await customPusher.send(*customSendOptions*);

`customSendOptions`会直接作为请求体发送, 具体请[查看示例](#自定义接口).

#### pushersSendConfig

> const results = await pushers.send(*pushersSendConfig*);

```typescript
const pushersSendConfig: Array<{
  name: string
  config: pushersSendConfig
}>
```

### 返回值

#### result

> const *result* = await pusher.send(sendOptions);

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `status` | `number` | `null` | [状态码](#状态码) |
| `statusText` | `string` | `null` | 状态说明文本 |
| `extraMessage` | `AxiosResponse` | `Error` | `null` | 扩展信息, 用于调试, 一般为`axios`响应对象 |

#### results

> const *results* = await pushers.send(pushersSendConfig);

```typescript
const results: Array<{
  name: string
  result: result
}>
```

## 支持的消息类型

> 所有平台支持均纯文本(`text`)格式消息, 大部分支持`markdown`格式消息, 部分支持`html`格式消息
>
> `markdown*`为支持`html`格式不支持`markdown`格式消息时自动将`markdown`转换为`html`格式
>
> `other`为部分平台支持特殊格式的消息, 可通过`customOptions`传入参数, 具体参数请查看相应平台的文档

- Showdoc: 'text'
- QQ(go-cqhttp): 'text', 'other'
- Qmsg: 'text', 'other'
- Discord: 'text', 'other'
- 飞书: 'text', 'other'
- NowPush: 'text', 'other'
- Chanify: 'text', 'other'
- Bark: 'text', 'other'
- Server酱Turbo: 'text', 'markdown'
- 息知: 'text', 'markdown'
- PushDeer: 'text', 'markdown', 'other'
- QQ频道: 'text', 'markdown', 'other'
- 企业微信: 'text', 'markdown', 'other'
- 企业微信群机器人: 'text', 'markdown', 'other'
- 钉钉: 'text', 'markdown', 'other'
- TelegramBot: 'text', 'markdown', 'html'
- 邮件: 'text', 'markdown*', 'html'
- PushPlus: 'text', 'markdown*', 'html'
- WxPusher: 'text', 'markdown*', 'html'

## 状态码

- `0`-`Missing Parameter: ***`: 缺少必要参数
- `10`-`Missing Options`: 缺少发送消息配置
- `11`-`Unknown Error`: 未知错误
- `200`-`Success`: 推送成功
- `201`-`Waiting`: 待审核
- `100`-`Error`: 请求发送成功, 服务器返回错误信息
- `101`-`No Response Data`: 请求发送成功, 但没有接收到服务器返回的数据
- `102`-`Request Error`: 请求发送失败, 一般是网络问题
- `103`-`Options Format Error`: 参数格式错误
- `104`-`Get "***" Failed`: 获取参数失败
- `140`-`Check Sign Failed`: 签名校检失败
