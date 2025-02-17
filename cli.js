#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { AllPusher } = require('./dist');

// 验证配置对象的结构
function validateConfig(config) {
  if (typeof config !== 'object' || config === null) {
    throw new Error('配置必须是一个对象');
  }

  // 验证平台配置
  if (config.platforms && typeof config.platforms !== 'object') {
    throw new Error('platforms 配置必须是一个对象');
  }
}

// 合并命令行参数到配置对象
function mergeCommandLineOptions(config, options) {
  const result = { ...config };
  
  // 处理平台特定配置
  if (options.platforms) {
    result.platforms = result.platforms || {};
    for (const [platform, settings] of Object.entries(options.platforms)) {
      result.platforms[platform] = {
        ...(result.platforms[platform] || {}),
        ...settings
      };
    }
  }
  
  return result;
}

// 定义版本号和描述
program
  .version(require('./package.json').version)
  .description('统一化推送服务命令行工具')
  .option('-c, --config <path>', '配置文件路径 (支持 YAML/JSON 格式)')
  .option('-m, --message <text>', '要发送的消息内容')
  .option('-f, --message-file <path>', '消息内容文件路径')
  .option('-t, --type <type>', '消息类型 (text/markdown/html)', 'text')
  .option('-w, --watch', '监听消息文件变化')
  .option('--platforms.<platform>.<key> <value>', '平台特定配置')
  .parse(process.argv);

const options = program.opts();

// 读取配置文件
async function loadConfig(configPath) {
  try {
    const content = fs.readFileSync(configPath, 'utf8');
    const ext = path.extname(configPath).toLowerCase();
    const config = ext === '.yaml' || ext === '.yml'
      ? yaml.load(content)
      : JSON.parse(content);
    
    validateConfig(config);
    return config;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`配置文件不存在: ${configPath}`);
    } else if (error instanceof yaml.YAMLException) {
      console.error(`YAML 解析错误: ${error.message}`);
    } else {
      console.error(`配置文件读取失败: ${error.message}`);
    }
    process.exit(1);
  }
}

// 读取消息内容
async function loadMessage(options) {
  if (options.message) {
    return options.message;
  }
  
  if (options.messageFile) {
    try {
      return fs.readFileSync(options.messageFile, 'utf8');
    } catch (error) {
      console.error(`消息文件读取失败: ${error.message}`);
      process.exit(1);
    }
  }
  
  // 检查是否有管道输入
  if (!process.stdin.isTTY) {
    return new Promise((resolve) => {
      let data = '';
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data));
    });
  }
  
  console.error('错误: 请提供消息内容 (-m) 或消息文件 (-f) 或通过管道输入');
  process.exit(1);
}

// 监听文件变化
function watchFile(filePath, callback) {
  let isProcessing = false;
  let timeout;

  const watcher = fs.watch(filePath, (eventType) => {
    if (eventType === 'change' && !isProcessing) {
      isProcessing = true;
      
      // 清除之前的定时器
      if (timeout) {
        clearTimeout(timeout);
      }
      
      // 设置新的定时器，防止文件被频繁修改时重复处理
      timeout = setTimeout(async () => {
        try {
          await callback();
        } catch (error) {
          console.error('处理文件变化时出错:', error.message);
        } finally {
          isProcessing = false;
        }
      }, 100);
    }
  });

  // 处理监听器错误
  watcher.on('error', (error) => {
    console.error(`文件监听出错: ${error.message}`);
  });

  console.log(`正在监听文件变化: ${filePath}`);
  
  // 优雅退出时清理监听器
  process.on('SIGINT', () => {
    watcher.close();
    process.exit(0);
  });
}

// 主函数
async function main() {
  try {
    // 加载并合并配置
    let config = options.config ? await loadConfig(options.config) : {};
    config = mergeCommandLineOptions(config, options);
    
    // 获取消息内容
    const message = await loadMessage(options);
    
    if (!message.trim()) {
      console.error('错误: 消息内容不能为空');
      process.exit(1);
    }
    
    // 创建推送实例
    const pusher = new AllPusher(config);
    
    // 发送消息
    await pusher.push({
      message,
      type: options.type
    });
    console.log('消息发送成功！');
  } catch (error) {
    if (error.response) {
      console.error('消息发送失败:', error.response.data || error.message);
    } else {
      console.error('消息发送失败:', error.message);
    }
    process.exit(1);
  }
}

// 启动程序
if (options.watch && options.messageFile) {
  watchFile(options.messageFile, main);
  main();
} else {
  main();
}