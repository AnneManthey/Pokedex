function getCardTemplate(cardObject, formattedName){
    return /*html*/ `
     <button id="card">
            <header>
                <p># ${cardObject.id}</p>
                <h2 id="card-name">${formattedName}</h2>
            </header>
            <main id="card-main" class="card-main ${cardObject.types[0]}">
                <img src="${cardObject.img}" alt="Pokemon">
            </main>
            <footer>
                <div>
                ${renderTypes(cardObject.types)}
                </div>
            </footer>
        </button>
    `
}

