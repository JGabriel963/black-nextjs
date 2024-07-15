const prompt = require('prompt-sync')()

let name = prompt("Digite seu nome: ")
let password = prompt("Digite seu senha: ")

while (name === password) {
    console.log("Senha igual ao nome! Por favor, digite outra senha")
    password = prompt("Digite sua senha: ")
}

console.log("Obrigado :)")