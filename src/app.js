import './app.css';

import { Game } from "./Game";

(() => {
    console.log('battleship app loaded');
    const wrapper = document.querySelector('.wrapper');
    
    const gameObj = Game();
    console.log(gameObj);
    wrapper.appendChild(gameObj.p1gameBoard.render());
    wrapper.appendChild(gameObj.p2gameBoard.render());
})();