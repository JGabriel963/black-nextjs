let list = ["2382329382", "3293293i293", "923283208484"]

let text = ""

for (let i = 0; i < list.length; i++) {
    text += `https://nasaex.com/dashboard?evento=${list[i]} \n`
}

console.log(text)