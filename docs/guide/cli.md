# 命令行

## 安装

```bash
npm install all-pusher-api -g
```

## 发送消息

```bash
allpush send -m '测试文本' -c '{\"name\":\"ServerChanTurbo\",\"config\":{\"key\":{\"token\":\"******\"}}}'
allpush send -m '测试文本' -f './config.json'
```

使用 `-c` 传 JSON 字符串时，需要压缩为单行并转义双引号。多个通道同时推送时建议使用 `-f` 指向配置文件。

| 参数 | 说明 |
| --- | --- |
| `-c, --config <config>` | JSON 配置字符串。 |
| `-f, --config-file <path>` | JSON 配置文件路径。 |
| `-m, --message <text>` | 消息内容。 |
| `-t, --title <text>` | 消息标题。 |
| `-h, --help` | 显示帮助。 |

配置文件可以直接写 `PushApi` 的配置数组：

```json
[
  {
    "name": "ServerChanTurbo",
    "config": {
      "key": {
        "token": "******"
      }
    }
  }
]
```

## QQ 机器人事件监听

事件监听主要用于获取 QQ 用户、群、频道的 openid。

```bash
allpush listen --app-id YOUR_APP_ID --app-secret YOUR_APP_SECRET
allpush listen --app-id YOUR_APP_ID --app-secret YOUR_APP_SECRET --intents PUBLIC_GUILD_MESSAGES,GUILDS
allpush listen --list-intents
allpush listen --app-id YOUR_APP_ID --app-secret YOUR_APP_SECRET --shard 0,4
```

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `--app-id` | 必填 | QQ 机器人 AppID。 |
| `--app-secret` | 必填 | QQ 机器人 AppSecret。 |
| `--intents` | 全部事件 | 订阅事件类型，逗号分隔。 |
| `--shard` | `0,1` | 分片参数，格式为 `index,total`。 |
| `--list-intents` | - | 列出所有可用事件类型。 |

常用事件类型：

| 名称 | 位值 | 说明 |
| --- | --- | --- |
| `GUILDS` | `1 << 0` | 频道事件。 |
| `GUILD_MEMBERS` | `1 << 1` | 成员事件。 |
| `GUILD_MESSAGES` | `1 << 9` | 私域消息事件。 |
| `DIRECT_MESSAGE` | `1 << 12` | 频道私信事件。 |
| `GROUP_AND_C2C_EVENT` | `1 << 25` | 群聊和单聊事件。 |
| `PUBLIC_GUILD_MESSAGES` | `1 << 30` | 公域消息事件，包含 at 机器人消息。 |

除 `GUILDS`、`GUILD_MEMBERS`、`PUBLIC_GUILD_MESSAGES` 等基础权限外，其他事件类型通常需要在 QQ 开放平台申请权限。
