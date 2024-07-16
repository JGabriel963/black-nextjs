const prompt = require('prompt-sync')()

let n = Number(prompt("Digite um número entre 0 e 10: ")) 

while(isNaN(n) || n < 0 || n > 10) {
    console.log("Valor inválido")
    n = Number(prompt("Digite um número entre 0 e 10: ")) 
}

console.log("Número: ", n)