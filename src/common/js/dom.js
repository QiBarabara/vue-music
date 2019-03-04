export function addClass(el,className) {
	// body...
	if (hasClass(el,className)) {
		return
	}
	let newClass=el.className.split(' ');
	newClass.push(className);
	el.className=newClass.join(' ')
}

export function hasClass(el,className) {
	// body...
	let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
	return reg.test(el.className)
}