/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const { PushApi } = require('../dist/index.js');
const config = JSON.parse(process.env.CONFIG);
(async () => {
  const results = (await new PushApi([
    {
      name: 'ServerChanTurbo',
      config: {
        key: {
          token: config.ServerChanTurbo.token
        }
      }
    },
    {
      name: 'PushDeer',
      config: {
        key: {
          token: config.PushDeer.token
        }
      }
    },
    {
      name: 'WxPusher',
      config: {
        key: {
          token: config.WxPusher.token,
          uids: [config.WxPusher.uid]
        }
      }
    },
    {
      name: 'PushPlus',
      config: {
        key: {
          token: config.PushPlus.token
        }
      }
    },
    {
      name: 'Showdoc',
      config: {
        key: {
          token: config.Showdoc.token
        }
      }
    },
    {
      name: 'Xizhi',
      config: {
        key: {
          token: config.Xizhi.token
        }
      }
    },
    {
      name: 'QqChannel',
      config: {
        key: {
          appID: config.QqChannel.appID,
          token: config.QqChannel.token,
          sandbox: true
        },
        channelID: config.QqChannel.channelID
      }
    },
    {
      name: 'WorkWeixin',
      config: {
        corpid: config.WorkWeixin.corpid,
        secret: config.WorkWeixin.secret,
        agentid: config.WorkWeixin.agentid,
        touser: config.WorkWeixin.touser
      }
    },
    {
      name: 'Mail',
      config: {
        key: {
          host: config.Mail.host,
          port: 465,
          secure: true,
          auth: {
            user: config.Mail.user,
            pass: config.Mail.pass
          }
        },
        options: {
          from: config.Mail.from,
          to: config.Mail.to
        }
      }
    },
    {
      name: 'TelegramBot',
      config: {
        token: config.TelegramBot.token,
        chat_id: config.TelegramBot.chat_id
      }
    },
    {
      name: 'DingTalk',
      config: {
        key: {
          token: config.DingTalk.token,
          secret: config.DingTalk.secret
        }
      }
    },
    {
      name: 'FeiShu',
      config: {
        key: {
          token: config.FeiShu.token,
          secret: config.FeiShu.secret
        }
      }
    },
    {
      name: 'Discord',
      config: {
        webhook: config.Discord.webhook
      }
    },
    {
      name: 'GoCqhttp',
      config: {
        key: {
          token: config.GoCqhttp.token,
          baseUrl: config.GoCqhttp.baseUrl,
          user_id: config.GoCqhttp.user_id
        }
      }
    },
    {
      name: 'IGot',
      config: {
        key: {
          token: config.IGot.token
        }
      }
    },
    {
      name: 'WorkWeixinBot',
      config: {
        key: {
          webhook: config.WorkWeixinBot.webhook
        }
      }
    },
    /*
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
          enable: true,
          host: '127.0.0.1',
          port: 7890
        }
      }
    },*/
    {
      name: 'Push',
      config: {
        key: {
          token: config.Push.token
        }
      }
    },
    {
      name: 'Slack',
      config: {
        key: {
          webhook: config.Slack.webhook
        }
      }
    },
    {
      name: 'Pushback',
      config: {
        key: {
          token: config.Pushback.token,
          userId: config.Pushback.userId
        }
      }
    },
    {
      name: 'Zulip',
      config: {
        key: {
          site: config.Zulip.site,
          token: config.Zulip.token,
          email: config.Zulip.email,
          to: `[${config.Zulip.userId}]`
        }
      }
    }, /*
    {
      name: 'RocketChat',
      config: {
        key: {
          webhook: '******'
        }
      }
    },*/
    {
      name: 'Pushover',
      config: {
        key: {
          token: config.Pushover.token,
          user: config.Pushover.user
        }
      }
    },
    {
      name: 'Iyuu',
      config: {
        key: {
          token: config.Iyuu.token
        }
      }
    },
    {
      name: 'Ntfy',
      config: {
        key: {
          token: config.Ntfy.token
        }
      }
    },
    {
      name: 'YiFengChuanHua',
      config: {
        key: {
          token: config.YiFengChuanHua.token
        }
      }
    },
    {
      name: 'WPush',
      config: {
        key: {
          token: config.WPush.token
        }
      }
    }
  ])
    .send({ message: '测试文本' })).map((e) => ((e.result.status >= 200 && e.result.status < 300) ? `${e.name} 测试成功` : `${e.name} 测试失败`));
  console.log(results);
  if (results.find((e) => e.includes('失败'))) {
    throw results.filter((e) => e.includes('失败')).join('\n');
  }
})();
