/* eslint-disable */
const chalk = require('chalk');
const fs = require('fs');

const msgPath = process.argv.slice(2, 3)[0];
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(build|chore|ci|docs|feat|fix|wip|perf|refactor|revert|style|test|temp|)(\(.+\)):\s.{1,50}\s((close\s#\d+)|(#\d+))?$/;

if (!(commitRE.test(msg) || msg.indexOf('Merge') === 0)) {
    console.error(
        `  ${chalk.bgRed.white(' ERROR ')}
  [${chalk.red(msg)}] 是 ${chalk.red('错误的提交消息格式')}
  ${chalk.red('正确的提交消息-示例:')}

  ${chalk.blue('feat(模块): 预发布环境增加A模块. close #123')}
  ${chalk.blue('fix(文案): 修复错误文案. close #456')}`
    );
    process.exit(1);
} else {
    console.log(`${chalk.green('The commit message has been verified successfully.')}`);
}
