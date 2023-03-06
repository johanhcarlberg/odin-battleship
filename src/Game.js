import { Player, AIPlayer } from "./player/player";
import { GameboardComponent } from "./gameboard/GameboardComponent";


export const Game = () => {
    const player1 = Player();
    player1.gameBoard.generateBoard();
    
    const player2 = AIPlayer();
    player2.gameBoard.generateBoard();

    const p1gameBoard = new GameboardComponent(player1);
    const p2gameBoard = new GameboardComponent(player2, true);

    return {
        player1,
        player2,
        p1gameBoard,
        p2gameBoard
    }
}