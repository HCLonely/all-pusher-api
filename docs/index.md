---
layout: home

hero:
  name: all-pusher-api
  text: 统一化推送服务 Node.js API
  tagline: 一套 API 同时接入钉钉、飞书、企业微信、Telegram、邮件、QQ、WxPusher、PushDeer、Bark、Slack、Zulip 等推送平台。
  image:
    src: /hero.svg
    alt: all-pusher-api
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 推送服务
      link: /services
    - theme: alt
      text: GitHub
      link: https://github.com/HCLonely/all-pusher-api

features:
  - icon:
      src: /feature-api.svg
    title: 统一调用方式
    details: 使用同一套 sendOptions 发送文本、Markdown、HTML 或平台自定义消息。
  - icon:
      src: /feature-services.svg
    title: 多平台支持
    details: 每个推送服务都有独立配置项、示例代码、支持类型和注意事项。
  - icon:
      src: /feature-cli.svg
    title: 支持命令行推送
    details: 通过 allpush send 使用 JSON 字符串或配置文件快速发送消息。
  - icon:
      src: /feature-custom.svg
    title: 可扩展自定义接口
    details: 使用 Custom 包装任意 HTTP 推送接口，并自定义成功判断规则。
---

::: warning 仅推送
本库只负责主动推送消息，不负责接收消息或交互会话。
:::
