"use strict";
/**
 * title: 活动
 * author: lijing
 * time: 2017-05-03
 */

define('conf/hy/op/hotevents.js', function (require, exports, modul) {
    require("$");
    var Ajax = require("utils/async/ajax"),
        Vue = require("vue"),
        UI = require("UI/dialog/alert.js"),
        Login = require("mods/login"),
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
    Vue.filter('hy', function (url) {
        if (url.indexOf("game") > 0) {
            return "/hy" + url.substr(url.indexOf("/game"));
        }
        if (url.indexOf("op") > 0) {
            return "/hy" + url.substr(url.indexOf("/op"));
        }
        return url;
    });
    new Vue({
        el: 'body',
        data: function data() {
            return {
                showContent: 'NOW',
                isShowModal: false,
                hasLogin: false,
                userData: {},
                isShowConent: false,
                rewardData: { name: '', description: '', friends: {} },
                clientTime: '',
                moreData: [],
                resultData: [],
                myeventData: []
            };
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
                                    if (!data.data.activityPlans.length) {
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
                    loadDownFn: function loadDownFn(me) {
                        self.clientTime = self.getClientTime();
                        Ajax.query({
                            url: "/api/cashback/plans?dynamic=" + self.showContent + "&planStatus=ALL&clientTime=" + self.clientTime + "&pageNum=" + pageNum1++ + "&pageSize=10",
                            success: function success(data) {
                                setTimeout(function () {
                                    me.resetload();
                                }, 300);
                                if (data.code === 200) {
                                    if (!data.data.activityPlans.length) {
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
                            url: "/api/ext/cashback/details?status=CASHBACK&type=INVITATIONFRIEND&pageNum=" + pageNum2++ + "&pageSize=10",
                            success: function success(data) {
                                setTimeout(function () {
                                    me.resetload();
                                }, 300);
                                if (data.code === 200) {
                                    if (!data.data.invitationFriendOrders.length) {
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
                if (this.showContent !== 'MYEVENTS' && this.showContent !== 'NOW') {
                    this.getData();
                } else if (this.showContent === 'MYEVENTS') {
                    if (window.userinfo) {
                        // this.isShowConent = true
                        this.getMyeventsData();
                    } else {
                        this.isShowConent = true;
                    }
                }
            }
            if (window.userinfo) {
                this.hasLogin = true;
                this.userData = window.userinfo;
            }
        },
        methods: {
            toggleCon: function toggleCon(opt) {
                this.isShowConent = false;
                window.location.hash = opt;
                this.showContent = opt;
                pageNum1 = 2;
                pageNum = 2;
                if (this.showContent !== 'NOW' && this.showContent !== 'MYEVENTS') {
                    this.getData();
                } else if (this.showContent === 'MYEVENTS') {
                    this.getMyeventsData();
                }
            },
            showReward: function showReward(eventObj) {
                var self = this;
                this.rewardData.name = eventObj.name;
                this.rewardData.description = eventObj.description;
                // 根据点击的活动ID获取获奖详情
                Ajax.query({
                    url: '/api/ext/cashback/details?status=CASHBACK&type=INVITATIONFRIEND&pageNum=1&pageSize=10',
                    success: function success(data) {
                        if (data.code === 200) {
                            self.rewardData.friends = data.data;
                            $('#modal').removeClass('hidden');
                        } else {
                            UI.alertSecond(data.message);
                        }
                    }
                });
                $('#modal').removeClass('hidden');
            },
            closeModal: function closeModal() {
                $('#modal').addClass('hidden');
                pageNum2 = 2;
            },
            // 获取comming或者ended的数据
            getData: function getData() {
                var self = this;
                var clientTime = self.getClientTime();
                self.resultData.splice(0);
                Ajax.query({
                    url: '/api/cashback/plans?planStatus=ALL&clientTime=' + clientTime + '&dynamic=' + this.showContent + '&pageNum=1&pageSize=10',
                    success: function success(data) {
                        if (data.code === 200) {
                            self.$set('resultData', data.data.activityPlans);
                            self.isShowConent = true;
                        } else {
                            UI.alertSecond(data.message);
                        }
                    }
                });
            },
            // 获取myevents请求
            getMyeventsData: function getMyeventsData() {
                var self = this;
                if (window.userinfo) {
                    this.myeventData.splice(0);
                    Ajax.query({
                        url: '/api/cashback/myPlans?userId=' + window.userinfo.user.id,
                        success: function success(data) {
                            if (data.code === 200) {
                                self.$set('myeventData', data.data.activityPlans);
                                self.isShowConent = true;
                                setTimeout(function () {
                                    new Swiper('.myevents-conainer', {
                                        lazyLoading: true, //解决轮播到最后再划显示默认图
                                        pagination: '.swiper-pagination'
                                    });
                                }, 1000);
                            } else {
                                UI.alertSecond(data.message);
                            }
                        }
                    });
                } else {
                    self.login();
                }
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
                    day = this.filterNum(date.getDate()),
                    hours = this.filterNum(date.getHours()),
                    minutes = this.filterNum(date.getMinutes()),
                    seconds = this.filterNum(date.getSeconds());
                return year + month + day + hours + minutes + seconds;
            },
            filterNum: function filterNum(num) {
                return num >= 10 ? num : '0' + num;
            },
            login: function login() {
                var self = this;
                Login.login(location.href, "");
                setTimeout(function () {
                    self.isShowConent = true;
                }, 1000);
            }
        }
    });
});
//# sourceMappingURL=../../../../maps/conf/hy/op/hotevents.js.map
