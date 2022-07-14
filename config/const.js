/*
 * @Author: SusieWu wurui@smartlink.com.cn
 * @Date: 2022-07-14 16:25:40
 * @LastEditors: SusieWu wurui@smartlink.com.cn
 * @LastEditTime: 2022-07-14 16:30:40
 * @FilePath: /docker-ding/sentry-node-webhook/config/const.js
 * @Description: 常量配置
 */

const SENTRY_HOOKS = {
  FawBigdataScreen: {
    dingding: 'https://oapi.dingtalk.com/robot/send?access_token=cbe3c6549fb30e80f7fce860907697af136eba43c59827470812fd931f9180ed',
    weixin: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=3cca63cd-1406-4e1c-a93c-6a41d6025322',
  },
};

module.exports = {
  SENTRY_HOOKS,
};
