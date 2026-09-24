const fs = require('node:fs');
const path = require('node:path');
const { version } = require('../package.json');

const docsDirectory = path.resolve(__dirname, '../docs');
const reportPath = path.join(docsDirectory, 'platform-status.md');

function getPlatforms() {
  return [...fs.readFileSync(path.join(docsDirectory, 'services.md'), 'utf8')
    .matchAll(/^## (\w+)\r?$/gm)].map((match) => match[1]);
}

function writeReport(results, outputPath = reportPath, testedAt = new Date().toISOString()) {
  const rows = getPlatforms().map((name) => {
    const status = results.get(name) || '⚠️无法测试';
    return `| [${name}](./services#${name.toLowerCase()}) | ${status} |`;
  });
  fs.writeFileSync(outputPath, [
    '# 推送平台支持状态',
    '',
    `当前版本：\`${version}\``,
    '',
    `测试时间（UTC）：${testedAt}`,
    '',
    '本页由 `test/all-push-api.js` 自动生成，展示本次测试结果。',
    '',
    '- ✅️成功：平台测试返回成功状态（200–299），或命中 Bark 返回 code 400 的既有特殊规则。',
    '- ❌️失败：平台测试返回失败状态或执行异常。',
    '- ⚠️无法测试：未配置测试凭据、未启用测试或不支持通过 PushApi 测试。',
    '',
    '无法测试不代表平台不受支持；失败也可能由凭据或网络问题引起。',
    '',
    '| 推送平台 | 支持状态 |',
    '| --- | --- |',
    ...rows,
    ''
  ].join('\n'));
}

function getTestConfigs(config) {
  return [
    {
      name: 'ServerChanTurbo',
      config: () => ({
        key: {
          token: config.ServerChanTurbo.token
        }
      })
    },
    {
      name: 'PushDeer',
      config: () => ({
        key: {
          token: config.PushDeer.token
        }
      })
    },
    {
      name: 'WxPusher',
      config: () => ({
        key: {
          token: config.WxPusher.token,
          uids: config.WxPusher.uids
        }
      })
    },
    {
      name: 'PushPlus',
      config: () => ({
        key: {
          token: config.PushPlus.token
        }
      })
    },
    {
      name: 'Showdoc',
      config: () => ({
        key: {
          token: config.Showdoc.token
        }
      })
    },
    {
      name: 'Xizhi',
      config: () => ({
        key: {
          token: config.Xizhi.token
        }
      })
    },
    {
      name: 'QQBot',
      config: () => ({
        key: {
          appId: config.QQBot.appId,
          appSecret: config.QQBot.appSecret
        },
        userId: config.QQBot.userId
      })
    },
    {
      name: 'Qmsg',
      config: () => ({
        key: {
          token: config.Qmsg.token
        }
      })
    },
    {
      name: 'NotifyX',
      config: () => ({
        key: {
          token: config.NotifyX.token
        }
      })
    },
    {
      name: 'WorkWeixin',
      config: () => ({
        corpid: config.WorkWeixin.corpid,
        secret: config.WorkWeixin.secret,
        agentid: config.WorkWeixin.agentid,
        touser: config.WorkWeixin.touser
      })
    },
    {
      name: 'Mail',
      config: () => ({
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
      })
    },
    {
      name: 'TelegramBot',
      config: () => ({
        token: config.TelegramBot.token,
        chat_id: config.TelegramBot.chat_id
      })
    },
    {
      name: 'DingTalk',
      config: () => ({
        key: {
          token: config.DingTalk.token,
          secret: config.DingTalk.secret
        }
      })
    },
    {
      name: 'FeiShu',
      config: () => ({
        key: {
          token: config.FeiShu.token,
          secret: config.FeiShu.secret
        }
      })
    },
    {
      name: 'Discord',
      config: () => ({
        webhook: config.Discord.webhook
      })
    },
    {
      name: 'WorkWeixinBot',
      config: () => ({
        key: {
          webhook: config.WorkWeixinBot.webhook
        }
      })
    },

    // {
    //   name: 'Bark',
    //   config: () => ({
    //     key: {
    //       token: config.Bark.token,
    //       baseURL: config.Bark.baseURL
    //     }
    //   })
    // },
    {
      name: 'Push',
      config: () => ({
        key: {
          token: config.Push.token
        }
      })
    },
    {
      name: 'Slack',
      config: () => ({
        key: {
          webhook: config.Slack.webhook
        }
      })
    },
    {
      name: 'Pushback',
      config: () => ({
        key: {
          token: config.Pushback.token,
          userId: config.Pushback.userId
        }
      })
    },
    {
      name: 'Zulip',
      config: () => ({
        key: {
          site: config.Zulip.site,
          token: config.Zulip.token,
          email: config.Zulip.email,
          to: config.Zulip.to
        }
      })
    },
    {
      name: 'Pushover',
      config: () => ({
        key: {
          token: config.Pushover.token,
          user: config.Pushover.user
        }
      })
    },
    {
      name: 'Iyuu',
      config: () => ({
        key: {
          token: config.Iyuu.token
        }
      })
    },
    {
      name: 'Ntfy',
      config: () => ({
        key: {
          token: config.Ntfy.token
        }
      })
    },
    {
      name: 'YiFengChuanHua',
      config: () => ({
        key: {
          token: config.YiFengChuanHua.token
        }
      })
    },
    {
      name: 'WPush',
      config: () => ({
        key: {
          token: config.WPush.token
        }
      })
    },
    // {
    //   name: 'PushBullet',
    //   config: () => ({
    //     key: {
    //       token: config.PushBullet.token
    //     }
    //   })
    // },
    {
      name: 'SimplePush',
      config: () => ({
        key: {
          token: config.SimplePush.token
        }
      })
    },
    {
      name: 'PushMe',
      config: () => ({
        key: {
          token: config.PushMe.token
        }
      })
    }
  ].filter(({ name }) => config[name] && typeof config[name] === 'object' &&
    Object.values(config[name]).some((value) => value !== '' && value !== null && value !== undefined));
}

async function runTests(config, PushApi, outputPath = reportPath) {
  const results = new Map();
  await Promise.all(getTestConfigs(config).map(async ({ name, config: createConfig }) => {
    try {
      const api = new PushApi([{ name, config: createConfig() }]);
      const responses = await api.send({ message: '测试文本' });
      const response = responses.find((entry) => entry.name === name);
      if (!response) return;
      const status = response.result?.status;
      // Preserve Bark's code 400 exception, including the current wrapped response format.
      // const barkSuccess = name === 'Bark' &&
      //   (response.result?.data?.code === 400 || response.result?.extraMessage?.data?.code === 400);
      results.set(name, (status >= 200 && status < 300) ? '✅️成功' : '❌️失败');
    } catch {
      results.set(name, '❌️失败');
    }
  }));
  // Persist failures before setting the process exit code; never write credentials or API responses.
  writeReport(results, outputPath);
  return results;
}

if (require.main === module) {
  (async () => {
    const config = JSON.parse(process.env.CONFIG || '{}');
    if (!config || typeof config !== 'object' || Array.isArray(config)) {
      throw new Error('CONFIG must be a JSON object');
    }
    const { PushApi } = require('../dist/index.js');
    const results = await runTests(config, PushApi);
    console.log(getPlatforms().map((name) => `${name} ${results.get(name) || '⚠️无法测试'}`).join('\n'));
    if ([...results.values()].includes('❌️失败')) process.exitCode = 1;
  })().catch(() => {
    console.error('测试脚本执行失败，请检查 CONFIG 格式、构建产物和文档写入权限。');
    process.exitCode = 1;
  });
}

module.exports = { runTests, writeReport };
