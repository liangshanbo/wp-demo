var config = {
    method: 'get',
    json: true/*,
    com: {
        pageNum: 1,
        pageSize: 10
            /,countryCode: "+91"/
    }*/
};
var headers = {
    "X-Gomeplus-App-Version": "1.0.0",
    "X-Gomeplus-Lang": "en",
    "X-Gomeplus-App": "003",
    "X-Gomeplus-Region": "in",
    "X-Gomeplus-Time-Zone": "+05:30",
    "content-type": "application/json",
    "X-Gomeplus-Trace-Id": "2222222222222",
    "X-Gomeplus-Device": "h5/1.0.0/browser/"
}

module.exports = { config, headers };
