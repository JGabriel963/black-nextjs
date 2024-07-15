const prompt = require('prompt-sync')()

let n = Number(prompt("Digite um número para ver sua tabuada: "))

for (let i = 0; i < 10; i++) {
    console.log(`${n} x ${i + 1} = ${n * (i + 1)}`)
}