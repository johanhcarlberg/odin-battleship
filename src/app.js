import { Game } from "./Game";

(() => {
    console.log('battleship app loaded');
    const wrapper = document.querySelector('.wrapper');
    
    const gameObj = Game();
    console.log(gameObj);
    wrapper.appendChild(gameObj.p1gameBoard.render());
})();