function getCardTemplate(cardObject, formattedName){
    return /*html*/ `
     <button onclick="openDialog(${cardObject.id})" id="card">
            <header>
                <p># ${cardObject.id}</p>
                <h2 id="card-name">${formattedName}</h2>
            </header>
            <main id="card-main">
                <img class="card-img ${cardObject.types[0]}" src="${cardObject.img}" alt="Pokemon">
            </main>
            <footer>
                <div>
                ${renderTypes(cardObject.types)}
                </div>
            </footer>
        </button>
    `
}

function getDialogTemplate(dialogBaseData, dialogPokeDetails, formattedName){
    return /*html*/ `
        <header class="dialog_header">
            <p># ${dialogBaseData.id}</p>
            <h2>${formattedName}</h2>
            <button onclick="closeDialog()">x</button>
        </header>
        <main>
            <section class="${dialogBaseData.types[0]}">
                <img src="${dialogBaseData.img}" alt="Pokemon">
                <div></div>
            </section>
            <section>
                <div class="tab">
                    <button class="tab_links" onclick="openDialogTab(event, 'dialog-about')" id="default-open">About</button>
                    <button class="tab_links" onclick="openDialogTab(event, 'dialog-stats')">Base Stats</button>
                    <button class="tab_links" onclick="openDialogTab(event, 'dialog-moves')">Moves</button>
                </div>
                <div id="dialog-about" class="tab_content">
                    ${renderDialogAboutTab(dialogPokeDetails)}
                </div>
                <div id="dialog-stats" class="tab_content">
                    ${renderDialogStatsTab(dialogPokeDetails.stats)}
                </div>
                <div id="dialog-moves" class="tab_content">
                    ${renderDialogMovesTab(dialogPokeDetails.moves)}
                </div>
            </section>
        </main>
        <footer>
            <button onclick="dialogPreviousCard(${dialogBaseData.id})" class="button_img"><img src="./assets/icons/arrow_left.png" alt="Arrow Left"></button>
            <button onclick="dialogNextCard(${dialogBaseData.id})" class="button_img"><img src="./assets/icons/arrow_right.png" alt="Arrow Right"></button>
        </footer>
    `
}
