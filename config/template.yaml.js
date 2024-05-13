const { WPush } = require("../dist/WPush")

- name: Bark
  type: json
  filename: copy
  quote: Bark 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Key
          type: text
          required: true
        baseURL:
          name: baseURL
          desp: 如果使用自建服务端, 需配置此选项. baseURL为"/yourkey"前面的部分.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Chanify
  type: json
  filename: copy
  quote: Chanify 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          type: text
          required: true
        baseURL:
          name: baseURL
          desp: 如果使用自建服务端, 需配置此选项. baseURL为"/<token>"前面的部分.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 钉钉群机器人
  type: json
  filename: copy
  quote: 钉钉群机器人配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: access_token
          type: text
          required: true
        secret:
          name: secret
          desp: 如果开启了加签, 此处填写加签密钥.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Discord
  type: json
  filename: copy
  quote: Discord 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        webhook:
          name: webhook地址
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 飞书群机器人
  type: json
  filename: copy
  quote: 飞书群机器人配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: hook token
          desp: webhook地址"https://open.feishu.cn/open-apis/bot/v2/hook/"后面的部分.
          type: text
          required: true
        secret:
          name: secret
          desp: 如果开启了加签, 此处填写加签密钥.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Gitter
  type: json
  filename: copy
  quote: Gitter 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          type: text
          required: true
        roomId:
          name: roomId
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: GoCqhttp
  type: json
  filename: copy
  quote: GoCqhttp 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        baseUrl:
          name: baseUrl
          desp: go-cqhttp 的http api地址, 以"http://"或"https://"开头.
          type: text
          required: true
        token:
          name: token
          type: text
        user_id:
          name: user_id
          desp: 推送的目标 QQ 号, 此参数与"group_id", "channel_id"二选一.
          type: text
        group_id:
          name: group_id
          desp: 推送的目标群号, 此参数与"user_id", "channel_id"二选一.
          type: text
        channel_id:
          name: channel_id
          desp: 推送的目标频道ID, 此参数与"user_id", "group_id"二选一, 且必须与"guild_id"同时存在.
          type: text
        guild_id:
          name: guild_id
          desp: 推送的目标子频道ID, 此参数必须与"channel_id"同时存在.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: GoogleChat
  type: json
  filename: copy
  quote: GoogleChat 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        webhook:
          name: webhook地址
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: IGot
  type: json
  filename: copy
  quote: IGot 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: 推送key
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 爱语飞飞
  type: json
  filename: copy
  quote: 爱语飞飞配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          type: text
          desp: IYUU令牌
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Mail
  type: json
  filename: copy
  quote: Mail 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 邮件服务器配置信息
      type: object
      body:
        host:
          name: 邮件发送服务器地址
          type: text
          required: true
        port:
          name: 邮件发送服务器端口
          type: text
          inputType: number
          required: true
        secure:
          name: 是否启用TLS/SSL
          type: boolean
          defaultValue: false
        auth:
          name: 认证信息
          type: object
          body:
            user:
              name: 邮件发送服务器的用户名
              type: text
              required: true
            pass:
              name: 邮件发送服务器的密码
              type: text
              required: true
    options:
      name: 收发邮箱配置
      type: object
      body:
        from:
          name: 发送邮件的邮箱地址
          type: text
          inputType: email
          required: true
        to:
          name: 接受邮件的邮箱地址
          type: text
          inputType: email
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Ntfy
  type: json
  filename: copy
  quote: Ntfy 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          desp: topic
          type: text
          required: true
        baseURL:
          name: baseURL
          desp: 如果使用自建服务端, 需配置此选项. baseURL为"mytopic"前面的部分.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Push
  type: json
  filename: copy
  quote: Push 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: API key
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Pushback
  type: json
  filename: copy
  quote: Pushback 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: at_token
          type: text
          required: true
        userId:
          name: User_id
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: PushDeer
  type: json
  filename: copy
  quote: PushDeer 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: pushkey
          type: text
          required: true
        baseURL:
          name: baseURL
          desp: 如果使用自建服务端, 需配置此选项.
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Pushover
  type: json
  filename: copy
  quote: Pushover 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: API Token
          type: text
          required: true
        user:
          name: user
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: PushPlus
  type: json
  filename: copy
  quote: PushPlus 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: token
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: QQ 频道机器人
  type: json
  filename: copy
  quote: QQ 频道机器人配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: token
          desp: QQ频道机器人的 token
          type: text
          required: true
        appID:
          name: appID
          desp: QQ频道机器人的 ID
          type: text
          required: true
        channelID:
          name: channelID
          desp: QQ频道的子频道 ID
          type: text
          required: true
        sandbox:
          name: sandbox
          desp: 使用QQ频道推送时是否启用沙箱
          type: boolean
          defaultValue: false
- name: RocketChat
  type: json
  filename: copy
  quote: RocketChat 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        webhook:
          name: webhook 地址
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Server 酱 Turbo
  type: json
  filename: copy
  quote: Server 酱 Turbo 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: token
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Showdoc
  type: json
  filename: copy
  quote: Showdoc 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: token
          desp: 推送地址"https://push.showdoc.com.cn/server/api/push/"后面的部分.
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Slack
  type: json
  filename: copy
  quote: Slack 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        webhook:
          name: webhook 地址
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: TelegramBot
  type: json
  filename: copy
  quote: TelegramBot 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: token
          type: text
          required: true
        chat_id:
          name: chat_id
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 企业微信
  type: json
  filename: copy
  quote: 企业微信配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        secret:
          name: secret
          desp: 管理员进入企业微信管理后台后点击“客户联系”-“客户”页面. 点开“API”小按钮, 可以看到secret.
          type: text
          required: true
        corpid:
          name: corpid
          desp: 企业管理员可在管理端“我的企业”－“企业信息”下直接查看的“企业ID”.
          type: text
          required: true
        agentid:
          name: agentid
          desp: 企业应用的id. 企业内部开发，可在应用的设置页面查看.
          type: text
          inputType: number
          required: true
        touser:
          name: touser
          desp: 指定接收消息的成员, 成员ID列表(多个接收者用"|"分隔, 最多支持1000个). 特殊情况:指定为"@all", 则向该企业应用的全部成员发送. 企业管理员可在管理端“通讯录”->点进某个成员的详情页中直接查看“帐号”。
          type: text
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 企业微信群机器人
  type: json
  filename: copy
  quote: 企业微信群机器人配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        webhook:
          name: webhook 地址
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: WxPusher
  type: json
  filename: copy
  quote: WxPusher 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: appToken
          type: text
          required: true
        uids:
          name: uids
          type: array
          desp: 发送目标的 UID, 也可在"sendOptions"中配置
          body:
            - name: uid
              desp: 点击+号新增
              type: text
              repeat: true
        topicIds:
          name: topicIds
          type: array
          desp: 发送目标的 topicId, 也可在"sendOptions"中配置
          body:
            - name: topicId
              desp: 点击+号新增
              type: text
              inputType: number
              repeat: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 息知
  type: json
  filename: copy
  quote: 息知配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: key
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: 一封传话
  type: json
  filename: copy
  quote: 一封传话配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          desp: API口令码
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: Zulip
  type: json
  filename: copy
  quote: Zulip 配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: api key
          type: text
          required: true
        site:
          name: site
          type: text
          required: true
        email:
          name: bot email
          type: text
          required: true
        to:
          name: 发送对象Id
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: WPush
  type: json
  filename: copy
  quote: WPush配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          desp: Token
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: PushBullet
  type: json
  filename: copy
  quote: PushBullet配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          desp: Token
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: SimplePush
  type: json
  filename: copy
  quote: SimplePush配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          desp: Token
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
- name: AnPush
  type: json
  filename: copy
  quote: AnPush配置参数生成器
  author: HCLonely
  body:
    key:
      name: 认证信息
      type: object
      body:
        token:
          name: Token
          desp: Token
          type: text
          required: true
        channel:
          name: channel
          desp: 推送通道id
          type: text
          required: true
    proxy:
      name: 代理设置(可选)
      type: object
      body:
        enable:
          name: 启用
          type: boolean
          defaultValue: false
        protocol:
          name: 代理协议
          type: text
          defaultValue: http
        host:
          name: 代理主机地址
          type: text
        port:
          name: 代理端口
          type: text
        username:
          name: 代理用户名
          type: text
        password:
          name: 代理密码
          type: text
