const prompt = require('prompt-sync')()

let option = Number(prompt("Digite um nota entre 0 e 10: "))

while (isNaN(option) || option < 0 || option > 10) {
    console.log("Opção inválida")
    option = Number(prompt("Digite uma nota entre 0 e 10: "))
}

console.log(`Nota digitada: ${option}`)


