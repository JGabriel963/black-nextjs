const prompt = require('prompt-sync')()

let sum = 0

for (let i = 0; i < 5; i++) {
    let n = Number(prompt("Digite um número: "))
    sum += n
}

console.log(`A soma de todos os número é: ${sum}`)
console.log(`A média dos número é: ${sum / 5}`)