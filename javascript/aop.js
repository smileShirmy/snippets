/**
 * 通过使用AOP的方式来给函数添加职责
 * 把一些跟核心业务逻辑无关的代码抽离出来
 * 再把这些功能通过“动态织入”的方式掺入业务逻辑模块中
 * 保持代码 纯净 以及 高内聚
 * 这是一种 装饰者模式 的实现
 */
Function.prototype.before = function (beforefn) {
    return () => {
        beforefn.apply(this, arguments)
        return this.apply(this, arguments)
    }
}

Function.prototype.after = function (afterfn) {
    return () => {
        let ret = this.apply(this, arguments)
        afterfn.apply(this, arguments)
        return ret
    }
}

let func = function() {
    console.log(2)
}

func = func.before(function() {
    console.log(1)
})

func = func.after(function() {
    console.log(3)
})

func = func.after(function() {
    console.log(4)
})

func()