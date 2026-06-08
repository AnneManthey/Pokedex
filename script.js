const baseURL = "https://pokeapi.co/api/v2/pokemon/";
let cardList = [];

function init() {
    loadCardObject();
    // renderCards();

}

function loadCardObject() {
    for (let pokeID = 1; pokeID < 21; pokeID++) {
        cardList.push({
            "name": loadPokeName(pokeID),
            "img": loadPokeImg(pokeID),
            // "type": loadPokeType(pokeID)
        });
    }

}


function renderCards() {
    const cardGallery = document.getElementById("content");
    cardGallery.innerHTML = "";
    for (let pokeID = 1; pokeID < 21; pokeID++) {
        cardGallery.innerHTML += getCardTemplate(pokeID);
    }

}



async function loadPokeName(pokeID) {
    let response = await fetch(baseURL + pokeID);
    let responseToJson = await response.json();
    return responseToJson.name;
}

async function loadPokeImg(pokeID) {
    let response = await fetch(baseURL + pokeID);
    let responseToJson = await response.json();
    console.log(responseToJson.sprites.other.official - artwork.front - shiny);
    return responseToJson.sprites.other.official - artwork.front - shiny;

}

async function loadPokeType(pokeID) {
    let response = await fetch(baseURL + pokeID);
    let responseToJson = await response.json();
    for (let typeIndex = 0; typeIndex < typeIndex.length; typeIndex++) {     // wie zugriff auf type length?
    }
    return responseToJson.name; //type
}






// To Do:

//Gallery:
// renderCards from Pokedex-API
// Attribute: Name, Img, Kategorie(n), ID
// Button: Mehr laden
// Anzeige: loading
// Suchfunktion über Input

// Display-Flex & flex-wrap: wrap
// Hintergrundfarbe über Class?
// Hover-Effect

// Footer


// Dialog:
// Dialog template
// renderDialog
// closeDialog (auf Hintergrund)
// render kategorien
// forward/back function