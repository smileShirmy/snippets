// 由一个组件，向上找最近的指定的组件
export function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

// 由一个组件，向上找到所有的指定组件
export function findComponentsUpward(context, componentName) {
  let parents = []
  const parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// 由一个组件，向下找到最近的指定组件
export function findComponentDownward(context, componentName) {
  const children = context.$children
  let component = null
  
  if (children.length) {
    for (const child of children) {
      const name = child.$options.name
      
      if (name === componentName) {
        component = child
        break
      } else {
        component = findComponentDownward(child, componentName)
        if (child) break
      }
    }
  }
  return component
}

// 由一个组件，向下找到所有指定的组件
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChildren = findComponentsDownward(child, componentName)
    return components.concat(foundChildren)
  }, [])
}

// 由一个组件，找到指定的兄弟组件
export function findBrothersComponents(context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}

function typeOf(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  }
  return map[toString.call(obj)]
}

// deepCopy
export function deepCopy(data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t ===' object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}