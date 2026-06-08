function init(){
    renderCards();

}


function renderCards(){
    const cardGallery = document.getElementById("content");
    cardGallery.innerHTML = "";
    // for-schleife über index bzw. id mit max 20?
    cardGallery.innerHTML += getCardTemplate();
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