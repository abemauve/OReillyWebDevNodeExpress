const fortuneCookies = [
    { id: 0, text: "Conquer your fears or they will conquer you." },
    { id: 1, text: "Rivers need springs." },
    { id: 2, text: "Do not fear what you don't know." },
    { id: 3, text: "You will have a pleasant surprise." },
    { id: 4, text: "Whenever possible, keep it simple." },
  ]

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length)
    return fortuneCookies[idx].text
}

exports.getAllFortunes = () => { 
    return fortuneCookies
}
