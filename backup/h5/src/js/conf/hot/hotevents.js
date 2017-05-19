"use strict";
/**
 * title: 活动
 * author: lijing
 * time: 2017-05-03
 */

define('conf/hot/hotevents.js', function (require, exports, modul) {
    require("$");
    var Ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        UI = require("UI/dialog/alert.js"),
        laz = require('utils/async/lazyload.js'),
        Swiper = require('mods/swiper');
    require('mods/filters/com');
    require('vendors/dropload.js');

    Vue.component('listmore', {
        props: {
            items: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        template: "#planlist_tpl"
    });
    Vue.component('friendsmore', {
        props: {
            friends: {
                type: Array,
                default: function _default() {
                    return [];
                }
            }
        },
        template: "#myevents_tpl"
    });
    var pageNum = 2;
    var pageNum1 = 2;
    var pageNum2 = 2;
    new Vue({
        el: 'body',
        data: function data() {
            return {
                showContent: 'now',
                isShowModal: false,
                hasLogin: false,
                userData: {},
                rewardData: { name: '', description: '', friends: {} },
                clientTime: '',
                moreData: [],
                resultData: [],
                compresultData: [{
                    "id": "3",
                    "name": "下单有礼",
                    "description": "订单实付款金额大于500卢比额外返利50卢比",
                    "beginTime": "5/18",
                    "endTime": "6/21",
                    "bannerImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493888000341&di=d6505e91e39b80fef39505263a600672&imgtype=0&src=http%3A%2F%2Fwww.ysg88.com%2FUploadFiles%2FFCK%2F2014-08%2F201408110V06J8L4J4.jpg",
                    "hot": "Y"
                }, {
                    "id": "3",
                    "name": "下单有礼",
                    "description": "订单实付款金额大于500卢比额外返利50卢比",
                    "beginTime": "5/18",
                    "endTime": "6/21",
                    "bannerImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493888000341&di=d6505e91e39b80fef39505263a600672&imgtype=0&src=http%3A%2F%2Fwww.ysg88.com%2FUploadFiles%2FFCK%2F2014-08%2F201408110V06J8L4J4.jpg",
                    "hot": "Y"
                }],
                myeventData: [],
                compmyeventData: [{
                    "id": "3",
                    "name": "下单有礼",
                    "description": "订单实付款金额大于500卢比额外返利50卢比",
                    "activityUrl": "http://m.gomeplus.in/hy/game/slot",
                    "logoImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493888000341&di=d6505e91e39b80fef39505263a600672&imgtype=0&src=http%3A%2F%2Fwww.ysg88.com%2FUploadFiles%2FFCK%2F2014-08%2F201408110V06J8L4J4.jpg",
                    "totalAmount": {
                        "amount": 880000,
                        "currency": "INR",
                        "symbol": "₹",
                        "align": "LEFT",
                        "alternative": "Rs"
                    }
                }, {
                    "id": "4",
                    "name": "邀请好友",
                    "description": "订单实付款金额大于500卢比额外返利50卢比",
                    "activityUrl": "http://m.gomeplus.in/hy/game/slot",
                    "logoImgUrl": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493888000341&di=d6505e91e39b80fef39505263a600672&imgtype=0&src=http%3A%2F%2Fwww.ysg88.com%2FUploadFiles%2FFCK%2F2014-08%2F201408110V06J8L4J4.jpg",
                    "totalAmount": {
                        "amount": 90000,
                        "currency": "INR",
                        "symbol": "₹",
                        "align": "LEFT",
                        "alternative": "Rs"
                    }
                }],
                friends: {
                    invitationFriendOrders: [{
                        "id": "123",
                        "userPic": "https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1494225138467&amp;di=b98bf854bf9b230d98b840e5b8a11fbe&amp;imgtype=0&amp;src=http%3A%2F%2Fu2.zhenyouliao.com%2Fimages%2F20140111%2F6e794165-9d47-40d8-9df8-3c35ff4fd9d8.jpg",
                        "nickName": "hehehe",
                        "time": 1493364201522
                    }, {
                        "id": "123",
                        "userPic": "https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1494225138467&amp;di=b98bf854bf9b230d98b840e5b8a11fbe&amp;imgtype=0&amp;src=http%3A%2F%2Fu2.zhenyouliao.com%2Fimages%2F20140111%2F6e794165-9d47-40d8-9df8-3c35ff4fd9d8.jpg",
                        "nickName": "hehehe",
                        "time": 2453364212522
                    }],
                    totalCount: 20
                }
            };
        },
        created: function created() {
            setTimeout(function () {
                new Swiper('.myevents-conainer', {
                    // loop: true,
                    // 如果需要分页器
                    lazyLoading: true, //解决轮播到最后再划显示默认图
                    pagination: '.swiper-pagination'
                });
            }, 1000);
        },
        init: function init() {
            var self = this;
            if ($('#plansList').children('.events-item').length > 0) {
                $('#plansList').dropload({
                    scrollArea: window,
                    domDown: {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                    },
                    loadDownFn: function loadDownFn(me) {
                        self.clientTime = self.getClientTime();
                        Ajax.query({
                            url: "/api/cashback/plans?dynamic=NOW&planStatus=ALL&clientTime=" + self.clientTime + "&pageNum=" + pageNum++ + "&pageSize=10",
                            success: function success(data) {
                                setTimeout(function () {
                                    me.resetload();
                                }, 300);
                                if (data.code === 200) {
                                    if (!data.data.plans.length) {
                                        UI.alertSecond("Data is loaded");
                                        return;
                                    }
                                    self.moreData = self.moreData.concat(data.data.plans);
                                    laz.lazyload();
                                } else {
                                    UI.alertSecond(data.message);
                                }
                            }
                        });
                    }
                });
            }
            if ($('#plansList1').children('.events-item').length > 0) {
                $('#plansList1').dropload({
                    scrollArea: window,
                    domDown: {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                    },
                    // domUp: {
                    //     domClass: 'dropload-up',
                    //     domRefresh: '<div class="dropload-refresh"><span class="loading"></span>↓下拉刷新</div>',
                    //     domUpdate: '<div class="dropload-update"><span class="loading"></span>↑释放更新</div>',
                    //     domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                    // },
                    // loadUpFn: function loadUpFn (me) {
                    //     console.log('11111')
                    // },
                    loadDownFn: function loadDownFn(me) {
                        self.clientTime = self.getClientTime();
                        Ajax.query({
                            url: "/api/cashback/plans?dynamic=" + self.showContent + "&planStatus=ALL&clientTime=" + self.clientTime + "&pageNum=" + pageNum1++ + "&pageSize=10",
                            success: function success(data) {
                                setTimeout(function () {
                                    me.resetload();
                                }, 300);
                                if (data.code === 200) {
                                    if (!data.data.plans.length) {
                                        UI.alertSecond("Data is loaded");
                                        return;
                                    }
                                    self.moreData = self.moreData.concat(data.data.plans);
                                    laz.lazyload();
                                } else {
                                    UI.alertSecond(data.message);
                                }
                            }
                        });
                    }
                });
            }
            if ($('#friendsList').children('.invited-items').length > 0) {
                $('#friendsList').dropload({
                    scrollArea: window,
                    domDown: {
                        domClass: 'dropload-down',
                        domRefresh: '<div class="dropload-refresh"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domUpdate: '<div class="dropload-update"><img src="' + wapcsspath + '/images/common/loading.png" alt=""/></div>',
                        domLoad: '<div class="dropload-load"><img src="' + wapcsspath + '/images/common/loading.gif" alt=""/></div>'
                    },
                    loadDownFn: function loadDownFn(me) {
                        self.clientTime = self.getClientTime();
                        Ajax.query({
                            url: "/api/cashback/plans?dynamic=" + self.showContent + "&planStatus=ALL&clientTime=" + self.clientTime + "&pageNum=" + pageNum2++ + "&pageSize=10",
                            success: function success(data) {
                                setTimeout(function () {
                                    me.resetload();
                                }, 300);
                                if (data.code === 200) {
                                    if (!data.data.invitationFriendOrders.length) {
                                        UI.alertSecond("Data is loaded");
                                        return;
                                    }
                                    self.moreData = self.moreData.concat(data.data.invitationFriendOrders);
                                    laz.lazyload();
                                } else {
                                    UI.alertSecond(data.message);
                                }
                            }
                        });
                    }
                });
            }
        },
        ready: function ready() {
            var type = this.getParams(window.location.href);
            if (type) {
                this.showContent = type;
                if (this.showContent !== 'myevents' && this.showContent !== 'now') {
                    this.getData();
                } else if (this.showContent === 'myevents') {
                    this.getMyeventsData();
                }
            }
            if (window.userinfo) {
                this.hasLogin = true;
                this.userData = window.userinfo;
            }
        },
        methods: {
            toggleCon: function toggleCon(opt) {
                window.location.hash = opt;
                this.showContent = opt;
                pageNum1 = 2;
                pageNum = 2;
                if (this.showContent !== 'now' && this.showContent !== 'myevents') {
                    this.getData();
                } else if (this.showContent === 'myevents') {
                    this.getMyeventsData();
                }
            },
            showReward: function showReward(eventObj) {
                this.rewardData.name = eventObj.name;
                this.rewardData.description = eventObj.description;
                this.rewardData.friends = this.friends;
                console.log(this.rewardData);
                // 根据点击的活动ID获取获奖详情
                // Ajax.query({
                //     url: '/ext/cashback/details?status=CASHBACK&type=INVITATIONFRIEND&pageNum=1&pageSize=10',
                //     success: function (data) {
                //         if (data.code === 200) {
                //             this.rewardData = data.data
                //             $('#modal').removeClass('hidden')
                //         }else {
                //             UI.alertSecond(data.message)
                //         }
                //     }
                // })
                $('#modal').removeClass('hidden');
            },
            closeModal: function closeModal() {
                $('#modal').addClass('hidden');
                pageNum2 = 2;
            },
            // 获取comming或者ended的数据
            getData: function getData() {
                var self = this;
                // this.resultData.splice(0)
                Ajax.query({
                    url: '/api/cashback/plans?planStatus=ALL&dynamic=' + this.showContent + '&pageNum=1&pageSize=10',
                    success: function success(data) {
                        self.$set('resultData', self.compresultData);
                        console.log(self.resultData);
                        // if (data.code === 200) {
                        //     this.$set('resultData', data.data.plans)
                        // }else {
                        //     UI.alertSecond(data.message)
                        // }
                    }
                });
            },
            // 获取myevents请求
            getMyeventsData: function getMyeventsData() {
                var self = this;
                // this.myeventData.splice(0)
                // Ajax.query({
                //     url: '/cashback/myPlans?userId=' + this.userData.user.id,
                //     success: function success(data) {
                //         if (data.code === 200) {
                //             this.$set('myeventData', data.data.activityPlans)
                //               setTimeout(function() {
                //                 new Swiper('.myevents-conainer', {
                //                     // loop: true,
                //                     // 如果需要分页器
                //                     lazyLoading: true, //解决轮播到最后再划显示默认图
                //                     pagination: '.swiper-pagination'
                //                 });
                //             },1000);
                //         }else {
                //              UI.alertSecond(data.message)
                //         }
                //     }
                // })
            },
            getParams: function getParams(url) {
                if (url.indexOf('#') > 0) {
                    return url.substr(url.indexOf('#') + 1);
                } else {
                    return null;
                }
            },
            getClientTime: function getClientTime() {
                var date = new Date(),
                    year = date.getFullYear(),
                    month = this.filterNum(date.getMonth() + 1),
                    day = this.filterNum(date.getDay()),
                    hours = this.filterNum(date.getHours()),
                    minutes = this.filterNum(date.getMinutes()),
                    seconds = this.filterNum(date.getSeconds());
                return year + month + day + hours + minutes + seconds;
            },
            filterNum: function filterNum(num) {
                return num > 10 ? num : '0' + num;
            }
        }
    });
});
//# sourceMappingURL=../../../maps/conf/hot/hotevents.js.map
