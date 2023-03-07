import './GameboardComponent.css';

export class GameboardComponent {
    constructor(player, hideShips = false) {
        this.player = player;
        this.gameboard = player.gameBoard;
        this.hideShips = hideShips;
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
                const position = e.currentTarget.position;
                console.log('clicked ' + position);
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
                    gameboardItem.classList.add('sunk');
                }

                if (this.gameboard.missExists(this.gameboard.getCoordsFromIndex(index))) {
                    gameboardItem.classList.add('miss');
                }

                if (this.gameboard.hitExists(this.gameboard.getCoordsFromIndex(index))) {
                    gameboardItem.classList.add('hit');
                }
            }
        }
    }
}