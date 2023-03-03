import { Game } from "./Game";
import { AIPlayer, Player } from "./player/player";

(() => {
    console.log('battleship app loaded');
    const wrapper = document.querySelector('.wrapper');
    
    const game = Game();
})();