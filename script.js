const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const cardGallery = document.getElementById("content");
const dialogRef = document.getElementById("dialog");
let galleryLimit = 20;

let cardList = [];
let currentCards = [];

function init() {
    loadCards();
}

function showAllCards() {
    cardGallery.innerHTML = "";
    currentCards = cardList.slice(0, galleryLimit);
    renderCards();
}

async function loadCards() {
    for (let pokeID = 1; pokeID < 201; pokeID++) {
        try {
            let response = await fetch(baseURL + pokeID);
            let pokeData = await response.json();
            let pokeTypes = [];
            for (let index = 0; index < pokeData.types.length; index++) {
                let currentTypeObject = pokeData.types[index];
                let typeName = currentTypeObject.type.name;
                pokeTypes.push(typeName);
            }

            cardList.push({
                "id": pokeID,
                "name": pokeData.name,
                "img": pokeData.sprites.other['official-artwork'].front_default,
                "types": pokeTypes
            });
        } catch (error) {
            console.error(`Bad request`, error);
        }
    }
    showAllCards();
}

function loadingSpinner(){
    const loadingSpinnerRef = document.getElementById("loading-spinner");
    loadingSpinnerRef.classList.toggle("d_none");
}



function loadMoreCards() {
    galleryLimit += 20;
    showAllCards();
}

function renderCards() {
    cardGallery.innerHTML = "";
    for (let index = 0; index < currentCards.length; index++) {
        let cardObject = currentCards[index];
        let formattedName = cardObject.name.charAt(0).toUpperCase() + cardObject.name.slice(1); // Ersten Buchstaben des Namens groß schreiben
        cardGallery.innerHTML += getCardTemplate(cardObject, formattedName);
    }
}

function filterCards() {
    let searchInputRef = document.getElementById("search-input");
    let searchInput = searchInputRef.value;
    const errorMessage = document.getElementById("error-message");
    if (searchInput.length >= 3) {
        currentCards = cardList.filter(cardList => cardList.name.toLowerCase().includes(searchInput.toLowerCase()));
        renderCards();
        errorMessage.classList.add("hide_error");
        searchInputRef.value = "";
    }
    else {
        errorMessage.classList.remove("hide_error");
    }
}


function renderTypes(typeList) {
    let pokeTypes = "";
    for (let index = 0; index < typeList.length; index++) {
        pokeTypes += `<p class="type-badge ${typeList[index]}">${typeList[index]}</p>`;
    }
    return pokeTypes;
}

async function openDialog(pokeID) {
    let dialogBaseData = null;
    for (let index = 0; index < currentCards.length; index++) {
        if (currentCards[index].id === pokeID) {
            dialogBaseData = currentCards[index];
        }
    }
    let response = await fetch(baseURL + pokeID);
    let dialogPokeDetails = await response.json();
    let formattedName = dialogBaseData.name.charAt(0).toUpperCase() + dialogBaseData.name.slice(1);

    dialogRef.showModal();
    dialogRef.innerHTML = getDialogTemplate(dialogBaseData, dialogPokeDetails, formattedName);
    document.getElementById("default-open").click();
}

async function dialogNextCard(currentID) {
    let nextID = currentID +1;
    if (nextID > currentCards.length) {
        nextID = 1;
    }
    await openDialog(nextID);
    }

async function dialogPreviousCard(currentID) {
    let previousID = currentID -1;
    if (previousID < 1){
        previousID = currentCards.length;
    }
    await openDialog(previousID);
    
}




function closeDialog() {
    event.stopPropagation();
    dialogRef.close();
}

function openDialogTab(evt, tabName) {
    let tabContent = document.getElementsByClassName("tab_content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    let tabLinks = document.getElementsByClassName("tab_links");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

}

function renderDialogTypes(typesArray) {
    let pokeTypes = "";
    for (let index = 0; index < typesArray.length; index++) {
        pokeTypes += `<span> ${typesArray[index]}</span>`;
    }
}

function renderDialogStatsTab(statsArray) { // Verbindung: dialogPokeDetails/dialogBaseData als Parameter in Functionsaufruf
    let pokeStats = "";
    for (let index = 0; index < statsArray.length; index++) {
        let currentPokeStat = statsArray[index];
        let name = currentPokeStat.stat.name.toUpperCase();
        let value = currentPokeStat.base_stat;

        pokeStats += `
        <div class="stat_row">
                <span class="stat_name">${name}:</span>
                <span class="stat_value">${value}</span>
            </div>
        `
    }
    return `
        <h3>Base Stats</h3>
        <div class="stats_container">
            ${pokeStats}
        </div>
    `
}

function renderDialogMovesTab(movesArray) {
    let pokeMoves = "";
    for (index = 0; index < movesArray.length && index < 5; index++) {
        let currentPokeMove = movesArray[index];
        let moveName = currentPokeMove.move.name;

        pokeMoves += `<p class="move_badge">${moveName}</p>`;
    }

    return `
        <h3>Moves</h3>
        <div class="moves_container">
            ${pokeMoves}
        </div>
    `
}

function getAbilitiesAsText(abilitiesArray) {
    let abilityText = "";
    for (let index = 0; index < abilitiesArray.length; index++) {
        abilityText += abilitiesArray[index].ability.name;

        if (index < abilitiesArray.length - 1) {
            abilityText += ", ";
        }
    }
    return abilityText;
}

function renderDialogAboutTab(dialogPokeDetails) {
    let heightInMeter = dialogPokeDetails.height / 10;
    let weightInKg = dialogPokeDetails.weight / 10;

    return `
        <h3>About</h3>
        <p>Height: ${heightInMeter} m</p>
        <p>Weight: ${weightInKg} kg</p>
        <p>Abilities: ${getAbilitiesAsText(dialogPokeDetails.abilities)}</p>
        <p>Base Exp: ${dialogPokeDetails.base_experience} XP</p>
    `

}










// To Do:


// Anzeige: loading
// html auslagern
// closeDialog (auf Hintergrund, der nicht scrollbar)


// Footer?
// CSS hübsch machen
// Hover-Effect
// Responsive