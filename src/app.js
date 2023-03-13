import './app.css';

import { Game } from "./Game/Game";

(() => {
    console.log('battleship app loaded');
    const wrapper = document.querySelector('.wrapper');
    
    const header = document.createElement('h1');
    header.classList.add('main-header');
    header.textContent = 'Battleship';
    wrapper.appendChild(header);

    const game = new Game();
    const p1Header = document.createElement('h2');
    p1Header.classList.add('player-header');
    p1Header.textContent = 'Player 1';
    wrapper.appendChild(p1Header);

    const p2Header = document.createElement('h2');
    p2Header.classList.add('player-header');
    p2Header.textContent = 'Player 2 (AI)';
    wrapper.appendChild(p2Header);

    wrapper.appendChild(game.player1gameBoard.render());
    wrapper.appendChild(game.player2gameBoard.render());
    wrapper.appendChild(game.gameOverComponent.render());
    wrapper.appendChild(game.player1ShipPlacement.render());
})();