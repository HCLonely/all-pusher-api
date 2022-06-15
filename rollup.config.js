import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import * as fs from 'fs';
import path from 'path';

const subModule = [
  './Custom',
  './DingTalk',
  './Discord',
  './FeiShu',
  './GoCqhttp',
  './Mail',
  './PushDeer',
  './PushPlus',
  './QqChannel',
  './ServerChanTurbo',
  './Showdoc',
  './TelegramBot',
  './WorkWeixin',
  './WxPusher',
  './Xizhi',
  './Qmsg',
  './WorkWeixinBot',
  './NowPush',
  './iGot',
  './Chanify',
  './Bark',
  './GoogleChat',
  './Push',
  './Slack',
  './Pushback'
];
const dependModule = ['crypto', 'axios', 'nodemailer', 'showdown', 'socks-proxy-agent', 'tunnel', 'ws', 'resty-client', './tool'];

export default () => fs.readdirSync('src').filter((fileName) => !['test.ts', 'bot-node-sdk'].includes(fileName) && !/\.d\.ts$/.test(fileName))
  .map((fileName) => ({
    input: path.join('src', fileName),
    output: [
      {
        file: path.join('dist', fileName.replace(/\.ts$/, '.js')),
        format: 'cjs',
        name: fileName.replace(/\.ts$/, ''),
        sourcemap: false
      }
    ],
    plugins: [
      json(),
      typescript({
        removeComments: true,
        useTsconfigDeclarationDir: true
      }),
      getBabelOutputPlugin({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: 'node 10'
            }
          ]
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ]
      })
    ],
    external: fileName === 'index.ts' ? [...subModule, ...dependModule] : dependModule
  }));
