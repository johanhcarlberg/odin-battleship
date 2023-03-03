import { AIPlayer, Player } from "./player/player";

(() => {
    console.log('battleship app loaded');
    const wrapper = document.querySelector('.wrapper');
    
    gameStart();
})();

const gameStart = () => {
    const player1 = Player();
    const player2 = AIPlayer();
}