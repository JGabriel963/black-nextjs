const prompt = require('prompt-sync')()

let maior = 0

for(let i = 0; i < 10; i++) {
    let idade = Number(prompt(`Digite a ${i + 1}º idade: `))

    while(isNaN(idade) || idade <= 0) {
        idade = Number(prompt(`Digite a ${i + 1}º idade novamente: `))
    }

    if(idade >= 18) {
        maior++
    }
}

console.log(`${maior} idades são de pessoas adultas`)