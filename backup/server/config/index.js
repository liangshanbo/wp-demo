var urldev = "http://10.125.196.111:9006",
    urlpro = "https://api.gomeplus.in",
    urlpre = "https://api-ovc-pre.gomeplus.com",
    js_pre = ' https://ds60ibq1anru.cloudfront.net',
    css_pre = 'https://ds60ibq1anru.cloudfront.net',
    js_production = 'https://drl8vxuq8vzq2.cloudfront.net',
    css_production = 'https://drl8vxuq8vzq2.cloudfront.net';

var config = {
    production: {
        url: urlpro, //生产环境
        static: {
            cdn: js_production,
            build: {
                wapjspath: js_production + '/m/dist',
                wapcsspath: css_production + '/m/dist'
            },
            debug: {
                wapjspath: js_production + '/m/src',
                wapcsspath: css_production + '/m/src'
            }
        }
    },
    pre: {
        url: urlpre, // 预生产环境
        static: {
            cdn: js_pre,
            build: {
                wapjspath: js_pre + '/m/dist',
                wapcsspath: css_pre + '/m/dist'
            },
            debug: {
                wapjspath: js_pre + '/m/src',
                wapcsspath: css_pre + '/m/src'
            }
        }
    },
    development: {
        url: urlpre, //开发环境接口
        static: {
            build: {
                wapjspath: 'http://localhost/h5/src',
                wapcsspath: 'http://localhost/h5/src'
            },
            debug: {
                wapjspath: 'http://localhost/h5/src',
                wapcsspath: 'http://localhost/h5/src'
            }
        }
    },
    develop: {
        url: urlpre, //开发环境接口
         static: {
            build: {
                wapjspath: 'http://localhost/h5/src',
                wapcsspath: 'http://localhost/h5/src'
            },
            debug: {
                wapjspath: 'http://localhost/h5/src',
                wapcsspath: 'http://localhost/h5/src'
            }
        }
    },
    dev_server: { //开发服务器--开发接口
        url: urldev,
        static: {
            build: {
                wapjspath: "http://m-dev.gomeplus.in:8000/h5/src",
                wapcsspath: "http://m-dev.gomeplus.in:8000/h5/src"
            },
            debug: {
                wapjspath: "http://localhost/h5/src",
                wapcsspath: "http://localhost/h5/src"
            }
        }
    },
    dev_pre_server: { //开发服务器--预生产接口
        url: urlpre,
        static: {
            wapjspath: "http://m-dev.gomeplus.in:8000/h5/src",
            wapcsspath: "http://m-dev.gomeplus.in:8000/h5/src"
        }
    }
};

module.exports = config;
