import { Player, AIPlayer } from "../player/player";
import { GameboardComponent } from "../gameboard/GameboardComponent";
import { GameOverComponent } from "./GameOverComponent";
import { ShipPlacementComponent } from "../gameboard/ShipPlacementComponent";


export class Game {
    constructor(generatePlayerBoard) {
        // Gameboard and player setup
        this.generatePlayerBoard = generatePlayerBoard;
        this.player1 = Player();
        if (this.generatePlayerBoard) {
            this.player1.gameBoard.generateBoard();
        }

        this.player2 = AIPlayer();
        this.player2.gameBoard.generateBoard();

        this.player1.setIsCurrentPlayer(true);
        
        // Gets triggered when player clicks enemy (AI) gameboard
        // Handles game logic for player and AI
        this.handleEnemyGameboardInput = (e) => {
            if (this.player2.gameBoard.isAllSunk() || this.player1.gameBoard.isAllSunk()) {
                return;
            }

            if (this.player1.gameBoard.getShipsToPlace().length > 0) {
                return;
            }

            // Gameboard position is stored as attribute on the gameboard item element
            const coords = this.player2.gameBoard.getCoordsFromIndex(e.currentTarget.position);

            this.player2.gameBoard.receiveAttack(coords[0],coords[1]);
            this.player2gameBoard.updateGameboardItems();

            if (this.player2.gameBoard.isAllSunk()) {
                console.log('Game Over, player 1 wins');
                this.gameOverComponent.setGameOverText('Player 1 wins!');
                this.gameOverComponent.toggle();
                return;
            }
            const aiAttack = this.player2.getNextAttack();

            // Queue valid adjacent attacks if AI attack hits
            const hit = this.player1.gameBoard.receiveAttack(aiAttack.x, aiAttack.y);
            if (hit === true) {
                if (this.player1.gameBoard.isValidPosition([aiAttack.x - 1, aiAttack.y])) {
                    this.player2.queueAttack(aiAttack.x - 1, aiAttack.y);
                }
                if (this.player1.gameBoard.isValidPosition([aiAttack.x + 1, aiAttack.y])) {
                    this.player2.queueAttack(aiAttack.x + 1, aiAttack.y);
                }
            }

            this.player1gameBoard.updateGameboardItems();
            if (this.player1.gameBoard.isAllSunk()) {
                console.log('Game Over, player 2 wins');
                this.gameOverComponent.setGameOverText('Player 2 wins!');
                this.gameOverComponent.toggle();
                return;
            }
        }

        this.player1gameBoard = new GameboardComponent(this.player1, false);
        this.player1ShipPlacement = new ShipPlacementComponent(this.player1.gameBoard)
        this.player2gameBoard = new GameboardComponent(this.player2, true, this.handleEnemyGameboardInput);
        this.gameOverComponent = new GameOverComponent('', () => {
            this.resetGame();
            this.gameOverComponent.toggle();
            this.player1ShipPlacement.updateShipsToPlace();
        });
    }

    resetGame() {
        this.player1.gameBoard.resetBoard();
        this.player2.gameBoard.resetBoard();
        this.player2.reset();
        if (this.generatePlayerBoard) {
            this.player1.gameBoard.generateBoard();
        }
        this.player2.gameBoard.generateBoard();
        this.player1.setIsCurrentPlayer(true);
        this.player1gameBoard.resetGameBoard();
        this.player2gameBoard.resetGameBoard();
    }
}