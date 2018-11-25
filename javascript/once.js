/**
 * 确保函数只执行一次
 * @param {Function} fn 
 */
export function once (fn) {
    let called = false
    return function () {
        if (!called) {
            called = true
            fn.apply(this, arguments)
        }
    }
}