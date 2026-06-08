function getCardTemplate(pokeID){
    return /*html*/ `
     <button id="card">
            <header>
                <p># ${pokeID}</p>
                <h2 id="card-name">${cardList.name}</h2>
            </header>
            <main>
                <img id="card-img" src="" alt="">
            </main>
            <footer>
                <img src="" alt="">
            </footer>
        </button>
    `
}

