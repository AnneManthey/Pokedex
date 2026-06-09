const baseURL = "https://pokeapi.co/api/v2/pokemon/";
const cardGallery = document.getElementById("content");
let cardList = [];
let currentCards = [];

function init() {
    loadCards();
}

function showAllCards() {
    cardGallery.innerHTML = "";
    currentCards = cardList;
    renderCards();
}

async function loadCards() {
    for (let pokeID = 1; pokeID < 21; pokeID++) {
        try {
            let response = await fetch(baseURL + pokeID);
            let pokeData = await response.json();
            let pokeTypes = pokeData.types.map(t => t.type.name); //types (ggf. mehrere) ziehen mit map
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

async function loadMoreCards() {
    for (let pokeID = 21; pokeID < 41; pokeID++) {
        try {
            let response = await fetch(baseURL + pokeID);
            let pokeData = await response.json();
            let pokeTypes = pokeData.types.map(t => t.type.name); //types (ggf. mehrere) ziehen mit map
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
    showAllCards()
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








// To Do:

//Gallery:


// Anzeige: loading
// Hover-Effect
// Footer


// Dialog:
// Dialog template
// renderDialog
// closeDialog (auf Hintergrund)
// render kategorien
// forward/back function