/**
 * 类型判断
 * @author wanglonghai
 * @date 20161211
 * 类型判断
 */
define('mods/type', function(require, exports, module) {

    function isType(type) {
        return function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        }
    }

    module.exports = {

        isString: isType('String'),
        isObject: isType('Object'),
        isNumber: isType('Number')
    }
});