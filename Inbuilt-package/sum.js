console.log("Namaste World")

const double = (num) => num * 2

// console.log(double(10))

// console.log(document)
// console.log(window)

// console.log(global)

//command line argument
console.log(process.argv)

const double1 = (num) => num * 2

const [, , n] = process.argv

console.log(double1(n))

const add = (n1, n2) => n1 + n2

const [, , n1, n2] = process.argv

console.log(add(+n1, +n2))