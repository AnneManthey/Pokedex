const baseURL = "https://pokeapi.co/api/v2/pokemon/";
let cardList = [];

function init() {
    loadCardObject();
    renderCards();

}

async function loadCardObject() {
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

}


function renderCards() {
    const cardGallery = document.getElementById("content");
    cardGallery.innerHTML = "";
    for (let pokeID = 1; pokeID < 21; pokeID++) {
        cardGallery.innerHTML += getCardTemplate(pokeID);
    }
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