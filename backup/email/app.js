var http = require('http');
var nodemailer = require('nodemailer');

http.createServer(function(req, res) {
    if (req.url && req.url.indexOf('?') > 0) {
        var search = req.url.slice(2);
        // console.log(params(search));
        sendEmail(params(search).job_name);
    }

}).listen(19999);


function sendEmail(job_name) {
    var transporter = nodemailer.createTransport({
        //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
        service: 'qq',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用 SSL
        auth: {
            user: '2899937088@qq.com',
            //这里密码不是qq密码，是你设置的smtp密码
            pass: 'djgbrkovpuszdcgf'
        }
    });

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '2899937088@qq.com', // 发件地址
        to: 'wanglonghai@gomeplus.com', // 收件列表
        subject: job_name + '发版完成', // 标题
        //text和html两者只支持一种
        html: '<p><strong>' + job_name + '</strong> 发版完成' + '</p><p>发版时间：' + (new Date()).toLocaleString() + '</p>' // html 内容
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function params(url) {
    if (url.indexOf("=") > 0) {
        var key_vals = url.split('='),params = {};
        for (var i = 0; i < key_vals.length; i += 2) {
            params[key_vals[i]] = key_vals[i+1];
        }
        return params;
    }
}