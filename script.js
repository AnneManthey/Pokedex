const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const cardGallery = document.getElementById("content");
const dialogRef = document.getElementById("dialog");
const bodyRef = document.getElementById("page-body");
const searchInputRef = document.getElementById("search-input");
const errorMessage = document.getElementById("error-message");
const noMatchMessage = document.getElementById("not-found-message");
const loadBtnRef = document.getElementById("load-btn");
let galleryLimit = 30;

let cardList = [];
let currentCards = [];

function init() {
    loadCards();
}

function showAllCards() {
    cardGallery.innerHTML = "";
    currentCards = cardList.slice(0, galleryLimit);
    errorMessage.classList.add("d_none");
    noMatchMessage.classList.add("d_none");
    renderCards();
}


async function loadCards() {
    loadingSpinner();
    for (let pokeID = 1; pokeID < 151; pokeID++) {
        try {
            let response = await fetch(baseURL + pokeID);
            let pokeData = await response.json();
            let pokeTypes = [];
            pushToCardList(pokeData, pokeTypes, pokeID)
        } catch (error) {
            console.error(`Bad request`, error);
        }
    }
    showAllCards();
}

function pushToCardList(pokeData, pokeTypes, pokeID) {
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
}

function loadingSpinner() {
    const loadingSpinnerRef = document.getElementById("loading-spinner");
    loadingSpinnerRef.classList.toggle("d_none"); // auch add?
    loadBtnRef.classList.add("d_none");
}


function loadMoreCards() {
    if (galleryLimit <=120){
    galleryLimit += 30;
    showAllCards();
    }
    else
        loadBtnRef.classList.add("d_none");
}

function renderCards() {
    cardGallery.innerHTML = "";
    for (let index = 0; index < currentCards.length; index++) {
        let cardObject = currentCards[index];
        let formattedName = cardObject.name.charAt(0).toUpperCase() + cardObject.name.slice(1); // Ersten Buchstaben des Namens groß schreiben
        cardGallery.innerHTML += getCardTemplate(cardObject, formattedName);
        loadBtnRef.classList.remove("d_none");
    }
}


function filterCards() {
    let searchInput = searchInputRef.value;
    hideMsgAndSpinner();
    if (searchInput.length >= 3) {
        renderFilteredCards(searchInput)
    }
    else {
        errorMessage.classList.remove("d_none");
    }
    searchInputRef.value = "";
}

function renderFilteredCards(searchInput) {
    currentCards = cardList.filter(cardList => cardList.name.toLowerCase().includes(searchInput.toLowerCase()));
    if (currentCards.length > 0) {
        renderCards();
        hideMsgAndSpinner()
    }
    else {
        noMatchMessage.classList.remove("d_none");
        errorMessage.classList.add("d_none");
    }
}

function hideMsgAndSpinner() {
    errorMessage.classList.add("d_none");
    noMatchMessage.classList.add("d_none");
    loadBtnRef.classList.add("d_none");
}


function renderTypes(typeList) {
    let pokeTypes = "";
    for (let index = 0; index < typeList.length; index++) {
        pokeTypes += `<span class="type-badge ${typeList[index]}">${typeList[index]}</span>`;
    }
    return pokeTypes;
}

async function loadDialogData(pokeID) {
    let dialogBaseData = [];
    for (let index = 0; index < currentCards.length; index++) {
        if (currentCards[index].id === pokeID) {
            dialogBaseData = currentCards[index];
        }
    }
    let response = await fetch(baseURL + pokeID);
    let dialogPokeDetails = await response.json();
    let formattedName = dialogBaseData.name.charAt(0).toUpperCase() + dialogBaseData.name.slice(1);
    openDialog(dialogBaseData, dialogPokeDetails, formattedName);
}

function openDialog(dialogBaseData, dialogPokeDetails, formattedName) {
    dialogRef.showModal();
    dialogRef.innerHTML = getDialogTemplate(dialogBaseData, dialogPokeDetails, formattedName);
    document.getElementById("default-open").click();
    dialogRef.classList.add("dialog_opened");
    bodyRef.classList.add("page_body");
}

async function dialogNextCard(currentID) {
    let nextID = currentID + 1;
    if (nextID > currentCards.length) {
        nextID = 1;
    }
    await loadDialogData(nextID);
}

async function dialogPreviousCard(currentID) {
    let previousID = currentID - 1;
    if (previousID < 1) {
        previousID = currentCards.length;
    }
    await loadDialogData(previousID);

}




function closeDialog() {
    event.stopPropagation();
    dialogRef.close();
    dialogRef.classList.remove("dialog_opened");
    bodyRef.classList.remove("page_body");
}

window.onclick = function (event) {
    if (event.target == dialogRef) {
        closeDialog();
    }
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
        pokeTypes += getDialogTypesTemplate();
    }
}


function renderDialogStatsTab(statsArray) { // Verbindung: dialogPokeDetails/dialogBaseData als Parameter in Functionsaufruf
    let pokeStats = "";
    for (let index = 0; index < statsArray.length; index++) {
        let currentPokeStat = statsArray[index];
        let name = currentPokeStat.stat.name.toUpperCase();
        let value = currentPokeStat.base_stat;
        pokeStats += /*html*/`  <tr><th>${name}:</th>
                                    <td><div class="dialog_progress_container">
                                            <div class="dialog_progress_bar" style="width:${value}%"><p>${value}%</p>
                                            </div>
                                        </div>
                                    </td>     
                                </tr>
                            `
    }
    return getDialogStatsTemplate(pokeStats);
 }


function renderDialogMovesTab(movesArray) {
    let pokeMoves = "";
    for (index = 0; index < movesArray.length && index < 5; index++) {
        let currentPokeMove = movesArray[index];
        let moveName = currentPokeMove.move.name;

        pokeMoves += `<p class="move_badge">${moveName}</p>`;
    }
    return getDialogMovesTemplate(pokeMoves);
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






// To Do:


// Border Radius im inner dialog?


// CSS hübsch machen:

// Footer, Logo, imprint etc?