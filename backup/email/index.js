var http = require('http');

http.createServer(function(req, res) {
    if (req.url && req.url.indexOf('?') > 0) {
        var search = req.url.slice(2);
        sendEmail(params(search).job_name);
    }

}).listen(19999);


function sendEmail(job_name) {
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'qq',
        port: 465, 
        secureConnection: true, 
        auth: {
            user: '2899937088@qq.com',
            pass: 'djgbrkovpuszdcgf'
        }
    });

    var mailOptions = {
        from: '2899937088@qq.com', 
        to: 'wanglonghai@gomeplus.com', 
        subject: job_name + '发版完成',
        html: '<p><strong>' + job_name + '</strong> 发版完成' + '</p><p>发版时间：' + (new Date()).toLocaleString() + '</p>'
    };

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