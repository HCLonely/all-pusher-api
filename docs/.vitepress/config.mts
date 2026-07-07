import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'all-pusher-api',
  description: '统一化推送服务 Node.js API 文档',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '推送服务', link: '/services' },
      { text: 'GitHub', link: 'https://github.com/HCLonely/all-pusher-api' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: 'API 用法', link: '/guide/api' },
          { text: '命令行', link: '/guide/cli' }
        ]
      },
      {
        text: '推送服务',
        items: [
          { text: '服务总览', link: '/services' },
          { text: 'Bark', link: '/services#bark' },
          { text: 'Chanify', link: '/services#chanify' },
          { text: 'DingTalk', link: '/services#dingtalk' },
          { text: 'Discord', link: '/services#discord' },
          { text: 'FeiShu', link: '/services#feishu' },
          { text: 'GoCqhttp', link: '/services#gocqhttp' },
          { text: 'GoogleChat', link: '/services#googlechat' },
          { text: 'Mail', link: '/services#mail' },
          { text: 'QQBot', link: '/services#qqbot' },
          { text: 'TelegramBot', link: '/services#telegrambot' },
          { text: 'WorkWeixin', link: '/services#workweixin' },
          { text: 'WorkWeixinBot', link: '/services#workweixinbot' },
          { text: 'WxPusher', link: '/services#wxpusher' },
          { text: 'Zulip', link: '/services#zulip' },
          { text: 'Custom', link: '/services#custom' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    search: {
      provider: 'local'
    }
  }
});
