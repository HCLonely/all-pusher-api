# 快速开始

## 安装

```bash
npm install all-pusher-api -S
```

## 单平台推送

可以通过统一入口 `PushApi` 推送，也可以直接引入单个平台类。

```js
const { PushApi } = require('all-pusher-api');

(async () => {
  const results = await new PushApi([
    {
      name: 'ServerChanTurbo',
      config: {
        key: {
          token: '******'
        }
      }
    }
  ]).send({
    title: '测试标题',
    message: '测试文本'
  });

  console.log(results);
})();
```

```js
const { WxPusher } = require('all-pusher-api/dist/WxPusher');

(async () => {
  const result = await new WxPusher({
    token: '******',
    uids: ['UID_xxx']
  }).send({
    title: '测试标题',
    message: '测试文本'
  });

  console.log(result);
})();
```

## 多平台推送

`PushApi` 接收一个平台配置数组，`name` 对应服务类名，`config` 为该服务自己的配置。不同服务的参数请查看 [推送服务](../services.md)。

```js
const { PushApi } = require('all-pusher-api');

(async () => {
  const pusher = new PushApi([
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
      name: 'WxPusher',
      config: {
        key: {
          token: '******',
          uids: ['UID_xxx']
        }
      }
    },
    {
      name: 'Mail',
      config: {
        key: {
          host: 'smtp.example.com',
          port: 465,
          secure: true,
          auth: {
            user: 'sender@example.com',
            pass: 'password'
          }
        },
        options: {
          from: 'sender@example.com',
          to: 'receiver@example.com'
        }
      }
    }
  ]);

  const results = await pusher.send({
    title: '测试标题',
    message: '测试文本'
  });

  console.log(results);
})();
```

## 配置写法

大部分服务既支持把认证参数直接放在顶层，也支持放在 `key` 中。为了统一管理，推荐始终使用 `key`：

```js
{
  name: 'PushDeer',
  config: {
    key: {
      token: '******'
    },
    proxy: {
      enable: true,
      host: '127.0.0.1',
      port: 1080
    }
  }
}
```

在线配置生成器：

https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js
