/*
 * @Author: SusieWu wurui@smartlink.com.cn
 * @Date: 2022-07-11 14:23:37
 * @LastEditors: SusieWu wurui@smartlink.com.cn
 * @LastEditTime: 2022-07-11 18:30:51
 * @FilePath: /docker-ding/node/app/controller/sentry.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const CircularJSON = require('circular-json');

/**
 * 对当前时间进行格式化
 */
const fmtDateTime = () => {
  const date = new Date();

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let hour = date.getHours();
  let min = date.getMinutes();

  month = month < 10 ? `0${month}` : month;
  hour = hour < 10 ? `0${hour}` : hour;
  min = min < 10 ? `0${min}` : min;

  return `${year}-${month}-${date.getDate()} ${hour}:${min}`;
};

class SentryController extends Controller {
  /**
   * 接收Sentry发送过来的Webhook
   */
  async recvSentryWebhook() {
    const { ctx } = this;
    const { request: { body } } = ctx;
    const error = body.data && body.data.error || {};
    ctx.logger.info('webhooklog');
    ctx.logger.info(body);
    ctx.logger.info('webhooklog');
    const ROBOT_DATA = {
      msgtype: 'markdown',
      markdown: {
        content: `<font color=\"warning\">${error.release || error.extra._productName}</font>发生错误:
                  > 错误原因: <font color=\"info\">${error.title}</font>
                  > 错误时间: <font color=\"info\">${fmtDateTime()}</font>
                  > 错误级别: <font color=\"${error.level === 'fatal' ? '#FF0000' : '#008000'}\">${error.level}</font>
                  > 错误链接: [查看日志](${error.web_url})`,
      },
    };
    const result = await axios({
      url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=3cca63cd-1406-4e1c-a93c-6a41d6025322',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify(ROBOT_DATA),
    });

    ctx.body = {
      status: 'success',
      data: CircularJSON.stringify(result),
      msg: '提醒成功',
    };


    // const ROBOT_DATA = {
    //   msgtype: 'markdown',
    //   markdown: {
    //     content: `<font color=\"warning\">1</font>发生错误:
    //               > 错误原因: <font color=\"info\">2</font>
    //               > 错误时间: <font color=\"info\">3</font>
    //               > 错误级别: <font color=\"4</font>
    //               > 错误链接: [查看日志](5)`,
    //   },
    // };
    // ctx.body = {
    //   status: 'success',
    //   data: {
    //     callback: ctx.response,
    //   },
    //   msg: '提醒成功',
    // };
  }
}

module.exports = SentryController;
