import './GameboardComponent.css';

export class GameboardComponent {
    constructor(gameboard) {
        this.gameboard = gameboard;
    }

    render() {
        const gameboardDiv = document.createElement('div');
        gameboardDiv.classList.add('gameboard-container');
        
        const boardItems = this.gameboard.getBoard();
        for (let i = 0; i < this.gameboard.getBoard().length; i++) {
            const gameboardItem = document.createElement('div');
            gameboardItem.classList.add('gameboard-item');
            gameboardItem.textContent = i;

            if (boardItems[i]) {
                gameboardItem.classList.add('ship');

                if(boardItems[i].isSunk()) {
                    gameboardItem.classList.add('sunk');
                }
            }
            
            gameboardDiv.appendChild(gameboardItem);
        }
        
        return gameboardDiv;
    }
}