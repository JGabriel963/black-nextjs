const prompt = require('prompt-sync')()

let maior = 0

for (let i = 0; i < 5; i++) {
    let n = Number(prompt("Digite um número: "))
    if(n > maior) {
        maior = n
    }
}

console.log(`O maior número foi ${maior}`)