function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
//洗牌函数
export function shuffle(arr) {
  let _arr = arr.slice()//不改变原数组，副本
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}


//节流函数，对某个函数做节流，返回一个函数。新的函数会延迟执行要节流的函数
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}