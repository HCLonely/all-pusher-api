#!/usr/bin/env node
/* eslint-disable max-len */

import { program } from 'commander';
import { PushApi } from './index';
import * as fs from 'fs';
import * as path from 'path';

interface CLIOptions {
  config: string;
  message: string;
  configFile?: string;
  title?: string;
}

interface PushResult {
  name: string;
  result: {
    status: number;
    statusText?: string;
  };
}
program
  .name('allpush')
  .version('1.5.0')
  .description('多平台推送通知 CLI 工具，基于 all-pusher-api');

program
  .command('send')
  .description('向配置的推送平台发送消息')
  .option('-c, --config <config>', 'JSON 配置字符串，需对引号进行转义。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js')
  .option('-f, --config-file <path>', 'JSON 配置文件路径。在线生成: https://configer.hclonely.com/?fileLink=https://raw.githubusercontent.com/HCLonely/all-pusher-api/main/config/template.yaml.js')
  .requiredOption('-m, --message <text>', '要发送的消息内容')
  .option('-t, --title <text>', '消息标题')
  .action(async (options: CLIOptions) => {
    try {
      if (!options.config && !options.configFile) {
        console.error('错误：必须提供 --config 或 --config-file 参数！');
        process.exit(1);
      }
      if (options.config && options.configFile) {
        console.warn('警告：同时提供了 --config 和 --config-file，后者将被忽略！');
      }
      let config;
      if (options.config) {
        config = JSON.parse(options.config);
      } else if (options.configFile) {
        const configPath = path.resolve(process.cwd(), options.configFile);
        const raw = fs.readFileSync(configPath, 'utf8');
        config = JSON.parse(raw);
      }
      if (!Array.isArray(config)) {
        config = [config];
      }
      const pusher = new PushApi(config);

      const results: PushResult[] = await pusher.send({
        message: options.message,
        title: options.title
      });

      console.log('\n推送结果:');
      results.forEach(({ name, result }) => {
        const status = result.status >= 200 && result.status < 300 ? '成功' : '失败';
        console.log(`• ${name}: ${status} (${result.status})`);
        if (result.statusText) {
          console.log(`  详情: ${result.statusText}`);
        }
        if (status === '失败') {
          console.dir(result, { depth: null });
        }
      });
    } catch (error: any) {
      console.error('发生错误:', error.message);
      console.error('错误详情:', error.stack);
      process.exit(1);
    }
  });

program.parse(process.argv);
