import './GameOverComponent.css';

export class GameOverComponent {
    constructor(gameOverText, newGameCallback) {
        this.gameOverText = gameOverText;
        this.newGameCallback = newGameCallback;
    }

    render() {
        this.gameOverContainer = document.createElement('div');
        this.gameOverContainer.classList.add('game-over-container', 'hidden');

        const gameOverDiv = document.createElement('div');
        gameOverDiv.classList.add('game-over');
        this.gameOverContainer.appendChild(gameOverDiv);

        const gameOverHeader = document.createElement('h2');
        gameOverHeader.classList.add('game-over-header');
        gameOverHeader.textContent = 'Game Over!';
        gameOverDiv.appendChild(gameOverHeader);

        this.gameOverSpan = document.createElement('span');
        this.gameOverSpan.classList.add('game-over-text');
        this.gameOverSpan.textContent = this.gameOverText || '';
        gameOverDiv.appendChild(this.gameOverSpan);

        const newGameButton = document.createElement('button');
        newGameButton.classList.add('new-game-button');
        newGameButton.textContent = 'New Game';
        if (this.newGameCallback) {
            newGameButton.addEventListener('click', (e) => {
                this.newGameCallback(e);
            })
        }
        gameOverDiv.appendChild(newGameButton);

        return this.gameOverContainer;
    }

    setGameOverText(gameOverText) {
        this.gameOverSpan.textContent = gameOverText
    }

    toggle() {
        if (this.gameOverContainer.classList.contains('hidden')) {
            this.gameOverContainer.classList.remove('hidden');
        } else {
            this.gameOverContainer.classList.add('hidden');
        }
        
    }
}