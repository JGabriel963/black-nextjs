const prompt = require('prompt-sync')()

for (let i = 0; i < 20; i++) {
    const name = prompt("Digite seu nome: ")
    let nota1 = Number(prompt("Digite a primeira nota: "))
    let nota2 = Number(prompt("Digite a segunda nota: "))
    let sum = nota1 + nota2

    console.log("Seu nome", name)
    console.log("Seu média", sum / 2)
}