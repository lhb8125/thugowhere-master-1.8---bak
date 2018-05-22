/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://wznbuvtu.qcloud.la';
//var host = 'https://weapp.tsingwind.top';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        // 获取菜品列表接口
        dishlistUrl: `${host}/weapp/dishlist`,

        // 获取菜品评论列表接口
        commentlistUrl: `${host}/weapp/commentlist`,

        // 获取个人评论列表接口
        personalCommentlistUrl: `${host}/weapp/personalcommentlist`,

        // 提交评论接口
        commentSubmitUrl: `${host}/weapp/commentsubmit`
    }
};

module.exports = config;
