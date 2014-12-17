"use strict";

var wechat=require('wechat')('yali');

module.exports = function (router) {

    router.use('/', wechat.process());

    /**
     * 文本消息处理
     */
    wechat.on('text', function (session) {
        session.replyTextMessage("Received:http://liangyali.duapp.com/my" + session.incomingMessage.Content);
    });

    /**
     * 用户订阅公共账号处理消息
     */
    wechat.on('event.subscribe', function (session) {
        session.replyTextMessage("欢迎关注！");
    });
};
