# all-pusher-api

统一化推送服务API. 已支持钉钉, Discord, 邮件, 飞书, PushDeer, PushPlus, QQ 频道, Server 酱, Showdoc Push, Telegram Bot, 企业微信群机器人, 息知, WxPusher等平台.

## 已支持平台

- [钉钉群机器人](https://developers.dingtalk.com/document/app/custom-robot-access)
- [Discord](https://discord.com/developers/docs/resources/webhook#edit-webhook-message)
- [邮件](https://nodemailer.com/)
- [飞书群机器人](https://www.feishu.cn/hc/zh-CN/articles/360024984973)
- [PushDeer](http://pushdeer.com)
- [PushPlus](https://pushplus.hxtrip.com/index)
- [QQ 频道机器人](https://bot.q.qq.com/wiki/develop/api/openapi/message/post_messages.html)
- [Server 酱](https://sct.ftqq.com)
- [Showdoc Push](https://push.showdoc.com.cn/#/)
- [Telegram Bot](https://core.telegram.org/bots/api#sendmessage)
- [企业微信群机器人](https://open.work.weixin.qq.com/api/doc/90000/90136/91770)
- [息知](https://xz.qqoq.net/#/index)
- [WxPusher](https://wxpusher.zjiecode.com/docs/)

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
          "title": "我 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
          "text": "![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n\n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划",
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

### 参数

#### pusherConfig

> const pusher = new WxPusher(*pusherConfig*);

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `token` | `string` | `null` | 大部分平台的授权token, 如果有授权信息有多个, 请使用`key` |
| `webhook` | `string` | `null` | Discord 平台的 webhook 地址, 该平台请使用`webhook`而不是`token` |
| `chat_id` | `string` | `null` | Telegram 平台的 chat_id |
| `corpid` | `string` | `null` | 企业微信群机器人的[corpid](https://developer.work.weixin.qq.com/document/path/90665#corpid) |
| `agentid` | `string` | `null` | 企业微信群机器人的[agentid](https://developer.work.weixin.qq.com/document/path/90665#agentid) |
| `secret` | `string` | `null` | 企业微信群机器人的[secret](https://developer.work.weixin.qq.com/document/path/90665#secret) |
| `touser` | `string` | `null` | 企业微信群机器人[指定接收消息的成员](https://developer.work.weixin.qq.com/document/path/90236#文本消息)，也可在[sendOptions](#sendOptions)中配置 |
| `uids` | `Array<string>` | `null` | WxPusher 发送目标的 UID，也可在[sendOptions](#sendOptions)中配置 |
| `topicIds` | `Array<number>` | `null` | WxPusher 发送目标的 topicId，也可在[sendOptions](#sendOptions)中配置 |
| `channelID` | `string` | `null` | QQ频道的子频道 ID, 使用QQ频道推送时此选项为**必选** |
| `key` | `object` | `null` | 所有平台的授权token都可以放到`key`中 |
| - `key.token` | `string` | `null` | 同`token`, `token`和`key.token`至少要有一个 |
| - `key.webhook` | `string` | `null` | 同`webhook` |
| - `key.secret` | `string` | `null` | 钉钉、飞书加签的密钥，可选。企业微信群机器人的`secret`, 同`secret` |
| - `key.chat_id` | `string` | `null` | 同`chat_id` |
| - `key.corpid` | `string` | `null` | 同`corpid` |
| - `key.agentid` | `string` | `null` | 同`agentid` |
| - `key.touser` | `string` | `null` | 同`touser` |
| - `key.uids` | `Array<string>` | `null` | 同`uids` |
| - `key.topicIds` | `Array<number>` | `null` | 同`topicIds` |
| - `key.appID` | `string` | `null` | QQ频道机器人的 ID, 使用QQ频道推送时此选项为**必选** |
| - `key.token` | `string` | `null` | QQ频道机器人的 token, 使用QQ频道推送时此选项为**必选** |
| - `key.sandbox` | `boolean` | `false` | 使用QQ频道推送时是否启用沙箱，可选 |
| - `key.host` | `string` | `null` | 邮件发送服务器地址, 使用邮件推送时此选项为**必选** |
| - `key.port` | `number` | `null` | 邮件发送服务器端口, 使用邮件推送时此选项为**必选** |
| - `key.secure` | `boolean` | `false` | 邮件发送服务器是否启用TLS/SSL, 可选 |
| - `key.auth` | `object` | `null` | 邮件发送服务器的验证信息, 使用邮件推送时此选项为**必选** |
|   - `key.auth.user` | `string` | `null` | 邮件发送服务器的用户名, 使用邮件推送时此选项为**必选** |
|   - `key.auth.pass` | `string` | `null` | 邮件发送服务器的密码, 使用邮件推送时此选项为**必选** |
| `proxy` | `object` | `null` | 代理配置, 可选，部分支持 |
| - `proxy.protocol` | `string` | `http` | 代理协议 |
| - `proxy.host` | `string` | `null` | 代理主机地址 |
| - `proxy.port` | `number` | `null` | 代理端口 |
| - `proxy.username` | `string` | `null` | 代理用户名 |
| - `proxy.password` | `string` | `null` | 代理密码 |

#### pushersConfig

> const pushers = new PushApi(*pushersConfig*);

```typescript
const pushersConfig: Array<pusherConfig>
```

#### sendOptions

> const result = await pusher.send(*sendOptions*);

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `message` | `string` | `null` | 推送的消息内容, `message`与`customOptions`至少要有一个 |
| `title` | `string` | `null` | 部分平台支持消息标题, 不填则自动提取`message`第一行的前10个字符 |
| `type` | `string` | `text` | 仅支持`text`, `markdown`, `html`. 具体平台支持情况请查看[支持的消息类型](#支持消息类型) |
| `extraOptions` | `object` | `null` | 附加内容, 此对象中的内容会附加到请求体中, [示例](#extraOptions) |
| `customOptions` | `object` | `null` | 自动以请求内容, 推送时会POST`customOptions`, [示例](#customOptions) |

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
| `extraMessage` | `AxiosResponse | Error` | `null` | 扩展信息, 用于调试, 一般为`axios`响应对象 |

#### results

> const *results* = await pushers.send(pushersSendConfig);

```typescript
const results: Array<{
  name: string
  result: result
}>
```

## 支持的消息类型

> 所有平台支持均纯文本(`text`)格式消息，大部分支持`markdown`格式消息，部分支持`html`格式消息
>
> `markdown*`为支持`html`格式不支持`markdown`格式消息时自动将`markdown`转换为`html`格式
>
> `other`为部分平台支持特殊格式的消息，可通过`customOptions`传入参数，具体参数请查看相应平台的文档

- Showdoc: 'text'
- Discord: 'text', 'other'
- 飞书: 'text', 'other'
- Server酱Turbo: 'text', 'markdown'
- 息知: 'text', 'markdown'
- PushDeer: 'text', 'markdown', 'other'
- QQ频道: 'text', 'markdown', 'other'
- 企业微信: 'text', 'markdown', 'other'
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
- `100`-`Error`: 请求发送成功，服务器返回错误信息
- `101`-`No Response Data`: 请求发送成功，但没有接收到服务器返回的数据
- `102`-`Request Error`: 请求发送失败，一般是网络问题
- `103`-`Options Format Error`: 参数格式错误
- `104`-`Get "***" Failed`: 获取参数失败
- `140`-`Check Sign Failed`: 签名校检失败
