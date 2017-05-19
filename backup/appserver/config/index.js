var develop = "http://10.125.196.111:9006",
    pre = "https://api-ovc-pre.gomeplus.com",
    urlpro = "https://api.gomeplus.in",
    js_pre = 'https://ds60ibq1anru.cloudfront.net',
    js_production = 'https://drl8vxuq8vzq2.cloudfront.net',
    config = {
        production: {
            url: urlpro, //生产环境
            static: {
                cdn: js_production,
                debug: {
                    wapjspath: 'https://drl8vxuq8vzq2.cloudfront.net/h5/src',
                    wapcsspath: 'https://drl8vxuq8vzq2.cloudfront.net/h5/src'
                },
                build: {
                    wapjspath: 'https://drl8vxuq8vzq2.cloudfront.net/h5/dist',
                    wapcsspath: 'https://drl8vxuq8vzq2.cloudfront.net/h5/dist'
                }
            }
        },
        pre: {
            url: pre, // 预生产环境
            static: {
                cdn: js_pre,
                debug: {
                    wapjspath: js_pre + '/h5/src',
                    wapcsspath: js_pre + '/h5/src'
                },
                build: {
                    wapjspath: js_pre + '/h5/dist',
                    wapcsspath: js_pre + '/h5/dist'
                }
            }
        },
        development: {
            url: pre,
            static: {
                debug: {
                    wapjspath: 'http://localhost/app/src',
                    wapcsspath: 'http://localhost/app/src'
                },
                build: {
                    wapjspath: 'http://localhost/app/src',
                    wapcsspath: 'http://localhost/app/src'
                }
            }
        },
        develop: {
            url: develop, //开发环境接口
            static: {
                debug: {
                    wapjspath: 'http://m-dev.gomeplus.in:8000/app/src',
                    wapcsspath: 'http://m-dev.gomeplus.in:8000/app/src'
                },
                build: {
                    wapjspath: 'http://m-dev.gomeplus.in:8000/app/src',
                    wapcsspath: 'http://m-dev.gomeplus.in:8000/app/src'
                }
            }
        },
        dev_server: { //开发服务器-开发环境接口
            url: develop,
            static: {
                debug: {
                    wapjspath: 'http://m-dev.gomeplus.in:8000/app/src',
                    wapcsspath: 'http://m-dev.gomeplus.in:8000/app/src'
                },
                build: {
                    wapjspath: 'http://m-dev.gomeplus.in:8000/app/src',
                    wapcsspath: 'http://m-dev.gomeplus.in:8000/app/src'
                }
            }
        },
        dev_pre_server: { //开发服务器-预生产环境接口
            url: pre,
            static: {
                debug: {
                    wapjspath: 'http://m-dev.gomeplus.in:8000/app/src',
                    wapcsspath: 'http://m-dev.gomeplus.in:8000/app/src'
                },
                build: {
                    wapjspath: 'http://m-dev.gomeplus.in:8000/app/src',
                    wapcsspath: 'http://m-dev.gomeplus.in:8000/app/src'
                }
            }
        }
    };

module.exports = {
    config: config,
    timestamp: "1.0.2"
};

