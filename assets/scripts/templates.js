function getCardTemplate(cardObject, formattedName){
    return /*html*/ `
     <button onclick="loadDialogData(${cardObject.id})" id="card" class="card_button">
            <header class="card_header">
                <p># ${cardObject.id}</p>
                <h2 id="card-name">${formattedName}</h2>
            </header>
            <main id="card-main" class="card_main">
                <img class="card_img ${cardObject.types[0]}" src="${cardObject.img}" alt="Pokemon">
            </main>
            <footer class="card_footer">
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
            <section class="dialog_img_section ${dialogBaseData.types[0]}">
                <img class="dialog_img" src="${dialogBaseData.img}" alt="Pokemon">
            </section>
            <section class= "dialog_tab_section ${dialogBaseData.types[0]}">
                <div class="dialog_tab">
                    <button class="tab_links ${dialogBaseData.types[0]}" onclick="openDialogTab(event, 'dialog-about')" id="default-open">About</button>
                    <button class="tab_links ${dialogBaseData.types[0]}" onclick="openDialogTab(event, 'dialog-stats')">Base Stats</button>
                    <button class="tab_links ${dialogBaseData.types[0]}" onclick="openDialogTab(event, 'dialog-moves')">Moves</button>
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
        <footer class= "dialog_footer">
            <button onclick="dialogPreviousCard(${dialogBaseData.id})" id="button-previous-card" class="button_img"><img src="./assets/icons/arrow_left.png" alt="Arrow Left"></button>
            <button onclick="dialogNextCard(${dialogBaseData.id})" id="button-next-card" class="button_img"><img src="./assets/icons/arrow_right.png" alt="Arrow Right"></button>
        </footer>
    `
}

function renderDialogAboutTab(dialogPokeDetails) {
    let heightInMeter = dialogPokeDetails.height / 10;
    let weightInKg = dialogPokeDetails.weight / 10;
    return /*html*/ `
    <table>
        <tr><th>Height:</th><td> ${heightInMeter} m</td></tr>
        <tr><th>Weight:</th><td> ${weightInKg} kg</td></tr>
        <tr><th>Abilities:</th><td> ${getAbilities(dialogPokeDetails.abilities)}</td></tr>
        <tr><th>Base Exp:</th><td> ${dialogPokeDetails.base_experience} XP</td></tr>
    </table>`
}

function getDialogTypesTemplate(){
    return /*html*/ `
        <span> ${typesArray[index]}</span>
    `
}

function getPokeStatsTemplate(pokeStats, name, value){
    return /*html*/`  <tr><th>${name}:</th>
                                    <td><div class="dialog_progress_container">
                                            <div class="dialog_progress_bar" style="width:${value}%"><p>${value}</p></div>
                                    </div></td>     
                                </tr> `
}

function getDialogStatsTemplate(pokeStats){
    return /*html*/ `
        <table class="stats_container">
            ${pokeStats}
        </table>
    `
}

function getDialogMovesTemplate(pokeMoves){
    return /*html*/ `
        <div class="moves_container">
            ${pokeMoves}
        </div>
    `
}
