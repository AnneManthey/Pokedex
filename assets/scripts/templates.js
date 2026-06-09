function getCardTemplate(cardObject, formattedName){
    return /*html*/ `
     <button onclick="openDialog()" id="card">
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

function getDialogTemplate(){
    return /*html*/ `
        <header class="dialog_header">
            <p>#</p>
            <h2>Name</h2>
            <button onclick="closeDialog()">x</button>
        </header>
        <main>
            <section>
                <img src="" alt="">
                <div></div>
            </section>
            <section>
                <div class="tab">
                    <button class="tablinks" onclick="openTab(event, 'dialog-about')" id="defaultOpen">About</button>
                    <button class="tablinks" onclick="openTab(event, 'dialog-stats')">Base Stats</button>
                    <button class="tablinks" onclick="openTab(event, 'dialog-moves')">Moves</button>
                </div>
                <div id="dialog-about" class="tab_content">
                    <h3>About</h3>
                    <p>Platzhalter</p>
                </div>
                <div id="dialog-stats" class="tab_content">
                    <h3>Base Stats</h3>
                    <p>Platzhalter</p>
                </div>
                <div id="dialog-moves" class="tab_content">
                    <h3>Moves</h3>
                    <p>Platzhalter</p>
                </div>
            </section>
        </main>
        <footer>
            <button class="button_img"><img src="./assets/icons/arrow_left.png" alt="Arrow Left"></button>
            <button class="button_img"><img src="./assets/icons/arrow_right.png" alt="Arrow Right"></button>
        </footer>
    `
}
