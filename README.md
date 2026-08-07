# Pokedex

A responsive, browser-based Pokedex for the first 151 Pokemon. The application fetches live Pokemon data from [PokeAPI](https://pokeapi.co/) and presents it in a searchable card gallery with detailed views.

## Features

- Displays the original 151 Pokemon with their official artwork and types
- Loads cards progressively with a **Load more** button
- Filters Pokemon by name (minimum three characters)
- Opens a detailed modal for each Pokemon
- Shows height, weight, abilities, base experience, base stats, and moves
- Lets users browse forward and backward through the current results
- Responsive layout for desktop and mobile screens

## Built with

- HTML5
- CSS3
- Vanilla JavaScript
- [PokeAPI](https://pokeapi.co/)

## Getting started

No installation or build step is required.

1. Clone the repository:

   ```bash
   git clone git@github.com:AnneManthey/Pokedex.git
   ```

2. Open the project folder.
3. Start a local web server, for example with VS Code's **Live Server** extension.
4. Open `index.html` in your browser.

An internet connection is required because Pokemon data and artwork are requested from PokeAPI at runtime.

## Project structure

```text
.
|-- index.html                  # Main application page
|-- script.js                   # API requests and application logic
|-- style.css                   # Component styling
|-- imprint.html                # Legal notice
`-- assets/
    |-- fonts/                  # Local web fonts
    |-- icons/                  # UI icons and logo
    |-- scripts/templates.js    # HTML template functions
    `-- styles/                 # Shared, background, font, and responsive styles
```

## Data and credits

Pokemon data and artwork are provided by [PokeAPI](https://pokeapi.co/). See the application's imprint page for additional icon credits and legal information.

## Author

Anne Manthey
