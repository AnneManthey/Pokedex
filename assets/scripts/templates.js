function getCardTemplate(pokeID){
    return /*html*/ `
     <button id="card">
            <header>
                <p># ${pokeID}</p>
                <h2 id="card-name">${cardList[pokeID].name}</h2>
            </header>
            <main>
                <img id="card-img" src="${cardList[pokeID].img}" alt="Pokemon">
            </main>
            <footer>
                <img src="" alt="">
            </footer>
        </button>
    `
}

