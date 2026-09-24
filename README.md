# Pokedex

Pokedex is a responsive browser application for exploring the original 151 Pokemon. It loads Pokemon data and official artwork from [PokeAPI](https://pokeapi.co/) and displays them in a searchable card gallery. Each card opens a detail dialog with information, base stats, and moves. The project uses plain HTML, CSS, and JavaScript without a package manager or build step.

## Quickstart

### Prerequisites

- A modern web browser with JavaScript enabled
- Internet access for requests to PokeAPI
- A local web server, such as the VS Code Live Server extension

### Setup

1. Open the project directory in a local web server.
2. Open `index.html` in the browser.

No installation or build command is required.

## Usage

- Browse the first 151 Pokemon in the card gallery.
- Select **Load more** to display additional cards.
- Enter at least three characters and select **Filter** to search by name.
- Select **Show all** to restore the default gallery.
- Select a card to open its detail dialog. The dialog includes the Pokemon's height, weight, abilities, base experience, base stats, and moves.
- Use the dialog navigation buttons to move through the currently displayed results.
- Open `imprint.html` for legal and image-credit information.

## Notes

Pokemon data and artwork are requested from PokeAPI at runtime, so the application requires an internet connection. The application requests Pokemon IDs 1 through 151 from the PokeAPI endpoint `https://pokeapi.co/api/v2/pokemon/`.

## Project Structure

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

## Author

Anne Manthey
