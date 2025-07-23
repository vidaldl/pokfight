# Pokefight

Pokefight is a simple web-based Pokémon battle game. You and a random enemy Pokémon face off in a turn-based battle, using classic moves and stats inspired by the original games. This project is designed for learning and demonstration purposes.

---

## Features
- Fetches random Pokémon and their moves from the PokéAPI
- Turn-based battle system (player vs. AI)
- Simple win/loss tracking (stored in your browser)
- Sound effects for attacks, misses, and fainting
- Modal popups for win/loss results
- Beginner-friendly codebase for learning

---

## Screenshots

<!-- Replace these with your own screenshots -->

![Battle Start](images/screenshot-battle-start.png)

![Player Wins](images/screenshot-win.png)

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

### Setup
1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd pokefight
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the address shown in the terminal (usually `http://localhost:5173`)

---

## How to Play
1. When the page loads, a random Pokémon is chosen for you and for your enemy.
2. Click on a move to attack. Each move has limited PP (uses).
3. The enemy will attack back automatically.
4. Win or lose, a modal will pop up with your result. Click to play again!
5. Your win/loss stats are shown at the top and saved in your browser.

---

## Project Structure
```
pokefight/
  public/           # Static assets (sounds, images)
  src/
    css/            # Stylesheets
    html/           # Modal HTML
    js/             # JavaScript source code
      controllers/  # Game logic controllers
      models/       # Data models (Pokemon, Move)
      services/     # API, audio, storage, recaptcha
      views/        # UI rendering
  index.html        # Main HTML file
  package.json      # Project metadata and scripts
```



---

## Credits
- Pokémon data and sprites from [PokéAPI](https://pokeapi.co/)
- Sound effects are placeholders or from open sources

---

## License
This project is for educational purposes only and is not affiliated with or endorsed by Nintendo, Game Freak, or The Pokémon Company. 