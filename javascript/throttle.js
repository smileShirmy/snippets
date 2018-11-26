const throttle = function(fn, interval) {
    let timer = null
    let firstTime = true
    return () => {
        if (firstTime) {
            fn()
            return firstTime = false
        }
        if (timer) {
            return false
        }
        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null
            fn()
        }, interval || 500)
    }
}

window.onresize = throttle(() => {
    console.log('resize')
}, 500)