import './ShipPlacementComponent.css';
import PubSub from 'pubsub-js';

export class ShipPlacementComponent {
    constructor(gameboard) {
        this.gameboard = gameboard;
        PubSub.subscribe('shipsPlacedChanged', () => this.updateShipsToPlace());
    }

    render() {
        this.shipPlacementContainer = document.createElement('div');
        this.shipPlacementContainer.classList.add('ship-placement-container');

        this.updateShipsToPlace();

        return this.shipPlacementContainer;
    }

    updateShipsToPlace() {
        if (this.gameboard.getShipsToPlace().length === 0) {
            this.shipPlacementContainer.classList.add('hidden');
            return;
        } 
        this.shipPlacementContainer.innerHTML = '';

        for (const shipToPlace of this.gameboard.getShipsToPlace()) {
            const shipDiv = document.createElement('div');
            shipDiv.classList.add('ship-to-place');
            shipDiv.draggable = true;
            shipDiv.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData("text/plain", shipToPlace);
            })
            for (let i = 0; i < shipToPlace; i++) {
                const shipCell = document.createElement('div');
                shipCell.classList.add('ship-to-place-cell');
                shipDiv.appendChild(shipCell);
            }

            this.shipPlacementContainer.appendChild(shipDiv);
        }
    }
}