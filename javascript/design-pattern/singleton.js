/**
 * 获取单例
 * @param {Function} fn 
 */
const getSingle = function (fn) {
    let result
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}
