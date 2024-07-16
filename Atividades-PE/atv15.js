const prompt = require('prompt-sync')()

let option = "1"

while(option !== "0") {
    let sum = 0
    for(let i = 0; i < 3; i++) {
        let n = Number(prompt(`Digite a ${i + 1} nota: `))

        while(isNaN(n)) {
            n = Number(prompt(`Digite a ${i + 1} nota novamente: `))
        }

        sum += n
    }

    console.log(`Sua média com as notas fornecidas é: ${sum / 3}`)
    option = prompt("Digite 1 para fazer denovo ou 0 para encerrar: ")

}