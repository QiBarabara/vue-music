// export function addClass(el,className) {
// 	// body...
// 	if (hasClass(el,className)) {
// 		return
// 	}
// 	let newClass=el.className.split(' ');
// 	newClass.push(className);
// 	el.className=newClass.join(' ')
// }

// export function hasClass(el,className) {
// 	// body...
// 	let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
// 	return reg.test(el.className)
// }

// //有值get没值set
// export function getData(el,name,val) {
// 	const prefix='data-';
// 	name=prefix+name;
// 	if (val) {
// 		return el.setAttribute(name,val);
// 	}
// 	else{
// 		return el.getAttribute(name);
// 	}
// }
export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function addClass(el, className) {
  el.classList.add(className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style
//各大浏览器transform的名称 供应商
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false //都不支持，说明浏览器有问题
})()

//适配不同浏览器的CSS
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}