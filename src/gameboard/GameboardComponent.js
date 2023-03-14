import './GameboardComponent.css';
import PubSub from 'pubsub-js';

export class GameboardComponent {
    constructor(player, hideShips = false, gameboardItemClickCallback) {
        this.player = player;
        this.gameboard = player.gameBoard;
        this.hideShips = hideShips;
        this.gameboardItemClickCallback = gameboardItemClickCallback;
        PubSub.subscribe('gameBoardChanged', (msg, gameboard) => {
            if (gameboard === this.gameboard) {
                this.updateGameboardItems();
            }
        })
    }

    render() {
        this.gameboardDiv = document.createElement('div');
        this.gameboardDiv.classList.add('gameboard-container');
        
        this.createGameBoard();
        this.updateGameboardItems();

        return this.gameboardDiv;
    }
    
    updateGameboardItems() {
        for (let gameboardItem of this.gameboardDiv.childNodes) {
            const index = gameboardItem.position;
            const board = this.gameboard.getBoard();
            if (board[index]) {
                if (!this.hideShips) {
                    gameboardItem.classList.add('ship');
                }

                if (board[index].isSunk()) {
                    gameboardItem.classList.remove('ship');
                    gameboardItem.classList.remove('hit');
                    gameboardItem.classList.add('sunk');
                } else if (this.gameboard.hitExists(this.gameboard.getCoordsFromIndex(index))) {
                    gameboardItem.classList.remove('ship');
                    gameboardItem.classList.add('hit');
                }
            } else {
                if (this.gameboard.missExists(this.gameboard.getCoordsFromIndex(index))) {
                    gameboardItem.classList.add('miss');
                }
            }
        }
    }

    createGameBoard() {
        for (let i = 0; i < this.gameboard.getBoard().length; i++) {
            const gameboardItem = document.createElement('div');
            gameboardItem.classList.add('gameboard-item');
            gameboardItem.textContent = i;
            gameboardItem.position = i;
            
            gameboardItem.addEventListener('click', (e) => {
                if (this.gameboardItemClickCallback) {
                    this.gameboardItemClickCallback(e);
                }
            })

            if (!this.player.isAI) {
                gameboardItem.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });
                gameboardItem.addEventListener('dragenter', (e) => {
                    e.preventDefault();
                    gameboardItem.style.border ="1px solid #f00";
                })
                gameboardItem.addEventListener('dragleave', (e) => {
                    e.preventDefault();
                    gameboardItem.style.border = "";
                })
                gameboardItem.addEventListener('drop', (e) => {
                    e.preventDefault();
                    gameboardItem.style.border = "";
                    const position = e.target.position;
                    const size = Number(e.dataTransfer.getData("text/plain"));
                    if (size) {
                        const coords = this.gameboard.getCoordsFromIndex(position);
                        console.log(coords);
                        try {
                            console.log('placing ship');
                            this.gameboard.placeShip(size, {x: coords[0], y: coords[1]});
                            console.log('placed ship');
                            PubSub.publish('gameBoardChanged', this.gameboard);
                            PubSub.publish('shipsPlacedChanged');
                        } catch(e) {
                            console.log(e);
                            return;
                        }
                    }
                })
            }
            
            this.gameboardDiv.appendChild(gameboardItem);
        }
    }

    resetGameBoard() {
        this.gameboardDiv.innerHTML = '';
        this.createGameBoard();
        this.updateGameboardItems();
    }
}