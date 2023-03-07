import { Player, AIPlayer } from "./player/player";
import { GameboardComponent } from "./gameboard/GameboardComponent";


export class Game {
    constructor() {
        this.player1 = Player();
        this.player1.gameBoard.generateBoard();
        this.player2 = AIPlayer();
        this.player2.gameBoard.generateBoard();
        this.player1.setIsCurrentPlayer(true);

        this.handleEnemyGameboardInput = (e) => {
            const coords = this.player2.gameBoard.getCoordsFromIndex(e.currentTarget.position);
            console.log(coords);
            if (this.player1.getIsCurrentPlayer()) {
                this.player2.gameBoard.receiveAttack(coords[0],coords[1]);
            }
        }

        this.player1gameBoard = new GameboardComponent(this.player1, false);
        this.player2gameBoard = new GameboardComponent(this.player2, true, this.handleEnemyGameboardInput);
    }
}