# all-pusher-api

统一化推送服务Nodejs API. 已支持钉钉, Discord, 邮件, 飞书, PushDeer, PushPlus, QQ, QQ 频道机器人, Server 酱, Showdoc Push, Telegram Bot, 企业微信群机器人, 息知, WxPusher, iGot, Chanify, Bark, Push, Slack, Pushback, Zulip, RocketChat等平台.

**！！！！！仅推送！！！！！不交互！！！！！！**

## 已支持平台

- [QQ(go-cqhttp)](https://github.com/Mrs4s/go-cqhttp) -- GoCqhttp
- ~~[QQ(Qmsg)](https://qmsg.zendee.cn/api) -- Qmsg~~
- ~~[QQ 频道机器人](https://bot.q.qq.com/wiki/develop/api/openapi/message/post_messages.html) -- QqChannel~~
- [QQ 官方机器人](https://bot.q.qq.com/wiki/develop/api-v2/) -- QQBot(主动推送能力差)
- [钉钉群机器人](https://developers.dingtalk.com/document/app/custom-robot-access) -- DingTalk
- [Discord](https://discord.com/developers/docs/resources/webhook#edit-webhook-message) -- Discord
- [邮件](https://nodemailer.com/) -- Mail
- [飞书群机器人](https://www.feishu.cn/hc/zh-CN/articles/360024984973) -- FeiShu
- [企业微信](https://open.work.weixin.qq.com/api/doc/90000/90136/91770) -- WorkWeixin
- [企业微信群机器人](https://developer.work.weixin.qq.com/document/path/91770) -- WorkWeixinBot
- [Telegram Bot](https://core.telegram.org/bots/api#sendmessage) -- TelegramBot
- [PushDeer](http://pushdeer.com) -- PushDeer
- [PushPlus](http://www.pushplus.plus/) -- PushPlus
- [Server 酱](https://sct.ftqq.com/r/13265) -- ServerChanTurbo
- [Showdoc Push](https://push.showdoc.com.cn/#/) -- Showdoc
- [息知](https://xz.qqoq.net/#/index) -- Xizhi
- [WxPusher](https://wxpusher.zjiecode.com/docs/) -- WxPusher
- ~~[NowPush](https://www.nowpush.app/index.html) -- NowPush~~
- [iGot](http://hellyw.com/) -- IGot
- [Chanify](https://github.com/chanify/chanify-ios) -- Chanify
- [Bark](https://github.com/Finb/Bark) -- Bark
- [GoogleChat](https://developers.google.com/chat/how-tos/webhooks) -- GoogleChat
- [Push](https://docs.push.techulus.com/api-documentation) -- Push
- [Slack](https://api.slack.com/messaging/webhooks) -- Slack
- [Pushback](https://pushback.io/docs/getting-started) -- Pushback
- [Zulip](https://zulip.com/api/send-message) -- Zulip
- [RocketChat](https://docs.rocket.chat/guides/administration/admin-panel/integrations#incoming-webhook-script) -- RocketChat
- ~~[Gitter](https://developer.gitter.im/docs/messages-resource) -- Gitter~~
- [Pushover](https://pushover.net/) -- Pushover
- [爱语飞飞](https://iyuu.cn/) -- Iyuu
- [Ntfy](https://docs.ntfy.sh/publish/) -- Ntfy
- [一封传话](https://www.phprm.com/push/h5/) -- YiFengChuanHua
- [WPush](https://wpush.cn/) -- WPush
- [PushBullet](https://www.pushbullet.com/) -- PushBullet
- [SimplePush](https://simplepush.io/) -- SimplePush
- ~~[AnPush](https://anpush.com/) -- AnPush~~
- [PushMe](https://push.i-i.me/) -- PushMe

## 安装

```shell
npm install all-pusher-api -S
```

## 使用

> 具体参数说明请查看[说明文档](https://all-push-api.vercel.app/)

### Example

#### 多平台推送

<details>
<summary><b>点击展开</b></summary>

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
    ...,
    {
      name: 'PushMe',
      config: {
        key: {
          token: '******'
        }
      }
    }
  ])
    .send({ message: '测试文本' })).map((e) => (e.result.status >= 200 && e.result.status < 300) ? `${e.name} 测试成功` : e));
})();
```

</details>

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

### 命令行使用

#### 全局安装

```bash
npm install all-pusher-api -g
```

#### 快速使用

```bash
allpush send -m '测试文本' -c '{\"name\":\"ServerChanTurbo\",\"config\":{\"key\":{\"token\":\"******\"}}}'
allpush send -m '测试文本' -f './config.json'

allpush send -h

# Usage: allpush send [options]
#
# 向配置的推送平台发送消息
#
# Options:
#   -c, --config <config>     JSON 配置字符串，需对引号进行转义。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js
#   -f, --config-file <path>  JSON 配置文件路径。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js
#   -m, --message <text>      要发送的消息内容
#   -t, --title <text>        消息标题
#   -h, --help                显示帮助信息
```

> 使用-c选项时JSON字符串要压缩为单行，双引号要转义！
> 使用多个通道同时推送时建议使用-f选项而不是-c选项！

## 支持的消息类型

> 所有平台支持均纯文本(`text`)格式消息, 大部分支持`markdown`格式消息, 部分支持`html`格式消息
>
> `markdown*`为支持`html`格式不支持`markdown`格式消息时自动将`markdown`转换为`html`格式
>
> `other`为部分平台支持特殊格式的消息, 可通过`customOptions`传入参数, 具体参数请查看相应平台的文档

- Showdoc: 'text'
- Pushover: 'text'
- 爱语飞飞: 'text'
- SimplePush: 'text'
- QQ(go-cqhttp): 'text', 'other'
- ~~Qmsg: 'text', 'other'~~
- Discord: 'text', 'other'
- 飞书: 'text', 'other'
- PushBullet: 'text', 'other'
- ~~NowPush: 'text', 'other'~~
- Chanify: 'text', 'other'
- Bark: 'text', 'other'
- Server酱Turbo: 'text', 'markdown'
- 息知: 'text', 'markdown'
- WPush: 'text', 'markdown'
- AnPush: 'text', 'markdown'
- PushDeer: 'text', 'markdown', 'other'
- QQ官方机器人: 'text', 'markdown', 'other'
- 企业微信: 'text', 'markdown', 'other'
- 企业微信群机器人: 'text', 'markdown', 'other'
- 钉钉: 'text', 'markdown', 'other'
- TelegramBot: 'text', 'markdown', 'html'
- 一封传话: 'text', 'markdown', 'html'
- PushMe: 'text', 'markdown', 'html'
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
