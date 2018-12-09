// 差集
const difference = (a, b) => a.filter(x => !new Set(b).has(x))