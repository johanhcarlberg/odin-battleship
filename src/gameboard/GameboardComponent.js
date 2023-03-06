import './GameboardComponent.css';

export class GameboardComponent {
    constructor(player, hideShips = false) {
        this.player = player;
        this.gameboard = player.gameBoard;
        this.hideShips = hideShips;
    }

    render() {
        const gameboardDiv = document.createElement('div');
        gameboardDiv.classList.add('gameboard-container');
        
        const boardItems = this.gameboard.getBoard();
        for (let i = 0; i < this.gameboard.getBoard().length; i++) {
            const gameboardItem = document.createElement('div');
            gameboardItem.classList.add('gameboard-item');
            gameboardItem.textContent = i;
            gameboardItem.position = i;

            gameboardItem.addEventListener('click', (e) => {
                const position = e.currentTarget.position;
                console.log('clicked ' + position);
            })

            if (boardItems[i] && !this.hideShips) {
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