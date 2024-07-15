const prompt = require('prompt-sync')()

let n = Number(prompt("Digite um número inteiro: "))

let primo = 0
let numbers = []

for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
        primo += 1
        numbers.push(i)
    }
}

if (primo > 2) {
    console.log(`O número ${n} não é primo`)
    console.log(`É divisivel por ${numbers}`)
} else {
    console.log(`O número ${n} é primo`)
}