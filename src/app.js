import './app.css';

import { Game } from "./Game";

(() => {
    console.log('battleship app loaded');
    const wrapper = document.querySelector('.wrapper');
    
    const game = new Game();
    wrapper.appendChild(game.player1gameBoard.render());
    wrapper.appendChild(game.player2gameBoard.render());
})();