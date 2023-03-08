import './GameboardComponent.css';

export class GameboardComponent {
    constructor(player, hideShips = false, gameboardItemClickCallback) {
        this.player = player;
        this.gameboard = player.gameBoard;
        this.hideShips = hideShips;
        this.gameboardItemClickCallback = gameboardItemClickCallback;
    }

    render() {
        this.gameboardDiv = document.createElement('div');
        this.gameboardDiv.classList.add('gameboard-container');
        
        for (let i = 0; i < this.gameboard.getBoard().length; i++) {
            const gameboardItem = document.createElement('div');
            gameboardItem.classList.add('gameboard-item');
            gameboardItem.textContent = i;
            gameboardItem.position = i;

            gameboardItem.addEventListener('click', (e) => {
                this.gameboardItemClickCallback(e);
            })
            
            this.gameboardDiv.appendChild(gameboardItem);
        }
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
}