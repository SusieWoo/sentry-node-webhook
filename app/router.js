/*
 * @Author: SusieWu wurui@smartlink.com.cn
 * @Date: 2022-07-11 14:13:27
 * @LastEditors: SusieWu wurui@smartlink.com.cn
 * @LastEditTime: 2022-07-11 15:48:06
 * @FilePath: /docker-ding/node/app/router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/webhook', controller.sentry.recvSentryWebhook);
};
