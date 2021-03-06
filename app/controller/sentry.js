/*
 * @Author: SusieWu wurui@smartlink.com.cn
 * @Date: 2022-07-11 14:23:37
 * @LastEditors: SusieWu wurui@smartlink.com.cn
 * @LastEditTime: 2022-07-14 16:46:52
 * @FilePath: /docker-ding/node/app/controller/sentry.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const CircularJSON = require('circular-json');
const { SENTRY_HOOKS } = require('../../config/const')

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
    // console.log(error !== {});
    console.log('-------ctx.request.body', ctx.request.body);
    console.log('-------ctx.request.body.data.error.tag', ctx.request.body.data.error.tag);
    console.log('-------ctx.request.body.data.error.tag', ctx.request.body.data.error.tag);
    console.log('-------error', error);

    if (error.request) {
      // const WEIXIN_DATA = {
      //   msgtype: 'markdown',
      //   markdown: {
      //     content: `alart:<font color=\"warning\">${error.request.url}</font>发生错误!
      //               > 事件id: <font color=\"info\">${error.event_id}</font>
      //               > 错误原因: <font color=\"info\">${error.title}</font>
      //               > 错误时间: <font color=\"info\">${fmtDateTime()}</font>
      //               > 错误级别: <font color=\"${error.level === 'fatal' ? '#FF0000' : '#008000'}\">${error.level}</font>
      //               > ${(error.web_url ? '错误链接: [查看日志](${error.web_url})' : '')}`,
      //   },
      // };
      // await axios({
      //   url: 'SENTRY_HOOKS.FawBigdataScreen.weixin',
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'application/json',
      //   },
      //   data: JSON.stringify(WEIXIN_DATA),
      // });

      const DINGDING_DATA = {
        msgtype: 'markdown',
        markdown: {
          title: 'New alart 前端监控通知',
          text: `发生错误: <font color=\"info\">${error.request.url}</font>
          错误原因: <font color=\"info\">${error.title}</font>
          错误时间: <font color=\"info\">${fmtDateTime()}</font>
          错误级别: <font color=\"${error.level === 'fatal' ? '#FF0000' : '#008000'}\">${error.level}</font>
          错误链接: [查看日志](${error.web_url})`,
        },
      };
      const result = await axios({
        url: SENTRY_HOOKS.FawBigdataScreen.dingding,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: JSON.stringify(DINGDING_DATA),
      });
      ctx.body = {
        status: 'success',
        data: CircularJSON.stringify(result),
        msg: '提醒成功',
      };
    } else {
      ctx.body = {
        status: 'fail',
        data: {},
        msg: '提醒失败',
      };
    }
  }
}

module.exports = SentryController;
