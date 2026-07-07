# API 用法

## PushApi

`PushApi` 用于一次配置多个推送服务。

```ts
new PushApi([
  {
    name: 'PushDeer',
    config: {
      key: {
        token: '******'
      }
    }
  }
]);
```

`name` 不区分大小写，当前入口支持的名称包括 `ServerChanTurbo`、`PushDeer`、`TelegramBot`、`DingTalk`、`WxPusher`、`Mail`、`FeiShu`、`WorkWeixin`、`PushPlus`、`Showdoc`、`Xizhi`、`Discord`、`GoCqhttp`、`WorkWeixinBot`、`Chanify`、`Bark`、`GoogleChat`、`Push`、`Slack`、`Pushback`、`Zulip`、`RocketChat`、`Pushover`、`Iyuu`、`Ntfy`、`YiFengChuanHua`、`WPush`、`PushBullet`、`SimplePush`、`PushMe`、`QQBot`。

## sendOptions

所有推送服务的 `send` 方法都接收统一的发送参数。

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `message` | `string` | 消息正文。除 `customOptions` 模式外通常必填。 |
| `title` | `string` | 消息标题。部分平台不支持标题，会合并到正文或忽略。 |
| `type` | `'text' \| 'markdown' \| 'html'` | 消息类型。每个平台支持范围不同。 |
| `extraOptions` | `object` | 合并到默认请求体中，用于补充平台特有字段。 |
| `customOptions` | `object` | 完全使用自定义请求体，适合发送平台特殊消息格式。 |

```js
await pusher.send({
  title: '部署通知',
  message: '服务已发布',
  type: 'markdown',
  extraOptions: {
    isAtAll: true
  }
});
```

## 按平台指定发送参数

对多平台推送时，`send` 也可以接收数组。`name: 'default'` 会作为兜底配置。

```js
await pusher.send([
  {
    name: 'DingTalk',
    options: {
      message: '钉钉专用消息',
      extraOptions: {
        at: {
          isAtAll: true
        }
      }
    }
  },
  {
    name: 'default',
    options: {
      message: '默认消息'
    }
  }
]);
```

## customOptions

`customOptions` 会绕过库内默认请求体生成逻辑，直接按平台 API 要求发送。

```js
const { DingTalk } = require('all-pusher-api/dist/DingTalk');

await new DingTalk({
  key: {
    token: '******'
  }
}).send({
  customOptions: {
    msgtype: 'actionCard',
    actionCard: {
      title: '标题',
      text: '正文',
      btnOrientation: '0',
      btns: [
        {
          title: '查看',
          actionURL: 'https://www.dingtalk.com/'
        }
      ]
    }
  }
});
```

## Custom

`Custom` 用于自定义 HTTP 推送接口。它不走统一 `sendOptions`，`send` 的入参会直接作为请求体或查询参数。

```js
const { Custom } = require('all-pusher-api/dist/Custom');

const custom = new Custom({
  url: 'https://example.com/push',
  method: 'POST',
  contentType: 'application/json',
  success: {
    key: 'responseData.code',
    value: 0
  }
});

await custom.send({
  text: '测试文本'
});
```

## 代理

支持代理的平台都接收统一的 `proxy` 配置：

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enable` | `boolean` | `false` | 是否启用代理。 |
| `protocol` | `string` | `'http'` | `http`、`https` 或 socks 协议。 |
| `host` | `string` | - | 代理地址。 |
| `port` | `number` | - | 代理端口。 |
| `username` | `string` | - | 代理用户名。 |
| `password` | `string` | - | 代理密码。 |

## 返回值

单平台 `send` 返回：

```ts
{
  status: number
  statusText: string
  extraMessage: any
}
```

多平台 `PushApi.send` 返回：

```ts
Array<{
  name: string
  result: {
    status: number
    statusText: string
    extraMessage: any
  }
}>
```

常见状态码：

| 状态码 | 说明 |
| --- | --- |
| `0` | 缺少必要参数。 |
| `10` | `PushApi` 未找到该平台发送参数。 |
| `11` | 未知错误。 |
| `100` | 请求成功发出，但服务端返回错误。 |
| `101` | 请求成功发出，但没有响应数据。 |
| `102` | 请求失败，通常是网络或代理问题。 |
| `103` | 发送参数格式错误。 |
| `104` | 获取参数失败。 |
| `140` | 签名校验失败。 |
| `200` | 推送成功。 |
| `201` | 等待审核。 |
