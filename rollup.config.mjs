import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import * as fs from 'fs';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const subModule = [
  './Custom',
  './DingTalk',
  './Discord',
  './FeiShu',
  './GoCqhttp',
  './Mail',
  './PushDeer',
  './PushPlus',
  // './QqChannel',
  './ServerChanTurbo',
  './Showdoc',
  './TelegramBot',
  './WorkWeixin',
  './WxPusher',
  './Xizhi',
  './Qmsg',
  './WorkWeixinBot',
  // './NowPush',
  // './iGot',
  './Chanify',
  './Bark',
  './GoogleChat',
  './Push',
  './Slack',
  './Pushback',
  './Zulip',
  './RocketChat',
  // './Gitter',
  './Pushover',
  './Iyuu',
  './Ntfy',
  './NotifyX',
  './YiFengChuanHua',
  './WPush',
  './PushBullet',
  './SimplePush',
  // 'AnPush',
  './PushMe',
  './QQBot'
];
const dependModule = ['fs', 'path', 'crypto', 'axios', 'nodemailer', 'marked', 'socks-proxy-agent', 'tunnel', 'ws', 'resty-client', 'commander', './tool'];

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
        // Disable disk caching on Windows to avoid EPERM during cache directory rotation.
        clean: process.platform === 'win32',
        // Each entry owns its rolling cache directories.
        cacheRoot: path.join('node_modules', '.cache', 'rollup-plugin-typescript2', fileName),
        // Emit declarations once via build:types, not once for every Rollup entry.
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            declarationDir: null,
            declarationMap: false
          }
        },
        include: [/.*\.ts$/],
        exclude: [/\.d\.ts$/]
      }),
      getBabelOutputPlugin({
        presets: [
          [
            '@babel/preset-env'
          ]
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ]
      }),
      resolve({
        preferBuiltins: false
      }),
      commonjs()
    ],
    external: fileName === 'index.ts' ? [...subModule, ...dependModule] : dependModule
  }));
