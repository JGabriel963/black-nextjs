const prompt = require('prompt-sync')()

let name = prompt("Digite seu nome: ")

while (name.length <= 3) {
    console.log('Nome inválido')
    name = prompt("Digite seu nome: ")
}

let age = Number(prompt("Digite sua idade: "))

while (isNaN(age) || age < 0 || age > 150) {
    console.log("Idade inválida")
    age = Number(prompt("Digite sua idade: "))
}

let wage = Number(prompt("Digite seu salário: "))

while (isNaN(wage) || wage <= 0) {
    console.log("Salário inválido")
    wage = Number(prompt("Digite seu salário: "))
}

let sex = prompt("Informe seu sexo (M - Masculino, F - Femenino):").toUpperCase()

while (sex !== "M" && sex !== "F") {
    console.log("Sexo inválido! Informe seu sexo corretamente.")
    sex = prompt("Informe seu sexo (M - Masculino, F - Femenino):").toUpperCase()
}

let state = prompt("Informe seu estado civivl (S - Solteiro; C - Casado(a); V - Viúvo(a); D - Divorciado").toUpperCase()

while (state !== "S" && state !== "C" && state !== "V" && state !== "D") {
    console.log("Estado civil inválido!")
    state = prompt("Informe seu estado civivl (S - Solteiro; C - Casado(a); V - Viúvo(a); D - Divorciado): ").toUpperCase()
}