export class GameOverComponent {
    constructor(gameOverText) {
        this.gameOverText = gameOverText;
    }

    render() {
        this.gameOverDiv = document.createElement('div');
        this.gameOverDiv.classList.add('game-over');

        const gameOverHeader = document.createElement('h2');
        gameOverHeader.classList.add('game-over-header');
        gameOverHeader.textContent = 'Game Over!';
        this.gameOverDiv.appendChild(gameOverHeader);

        const gameOverSpan = document.createElement('span');
        gameOverSpan.classList.add('game-over-text');
        gameOverSpan.textContent = this.gameOverText || '';
        this.gameOverDiv.appendChild(gameOverSpan);

        const newGameButton = document.createElement('button');
        newGameButton.classList.add('new-game-button');
        newGameButton.textContent = 'New Game';
        this.gameOverDiv.appendChild(newGameButton);

        return this.gameOverDiv;
    }
}