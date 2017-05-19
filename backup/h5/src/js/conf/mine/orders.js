'use strict';

/**
 * 我的--返利订单
 * @author ZhangEnming
 * @date 2017-02-27
 * 页面引用
 *  <script src="__PUBLIC__/js/lithe.js"
 data-config="config.js"
 data-debug="true"
 data-main="conf/mine/orders.js">
 </script>
 */

// define('conf/mine/orders.js', function(require, exports, module) {

// require('vue');
var IMG_PATH = '../../../dist/images/common/';
var orders = [{
    id: 1,
    provider: 'Paytm',
    date: '2017-02-08',
    image: IMG_PATH + 'mark.png',
    rebateAmount: 255.56,
    rebateDate: '2017-03-16',
    /*
    1 预计返利
    2 返利到账
    3 返利失败
    */
    status: 1
}, {
    id: 2,
    provider: 'Flipkart',
    date: '2017-02-12',
    image: IMG_PATH + 'header-icon-back.png',
    rebateAmount: 22222,
    rebateDate: '2017-05-16',
    status: 2
}, {
    id: 3,
    provider: 'Paytm',
    date: '2017-02-22',
    image: IMG_PATH + 'mark1.png',
    rebateAmount: 1111,
    rebateDate: '2017-04-16',
    status: 3
}];

new Vue({
    el: '#content',
    data: function data() {
        return {
            orders: orders,
            filteredOrders: []
        };
    },

    currentStatus: 0,
    methods: {
        filterBy: function filterBy(statusNumber) {
            switch (statusNumber) {
                case 0:
                    this.filteredOrders = this.orders;
                    break;
                default:
                    this.filteredOrders = this.orders.filter(function (i) {
                        return i.status === statusNumber;
                    });
            }
            this.currentStatus = statusNumber;
        }
    },
    beforeMount: function beforeMount() {
        this.filterBy(0);
    }
});

// });
//# sourceMappingURL=../../../maps/conf/mine/orders.js.map
