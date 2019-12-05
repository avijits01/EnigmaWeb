const foo = (x) => (y) => {
    return x + y
}

var a = foo(1)(2)
console.log(a)