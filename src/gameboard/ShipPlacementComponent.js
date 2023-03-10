import './ShipPlacementComponent.css';

export class ShipPlacementComponent {
    constructor(gameboard) {
        this.gameboard = gameboard;
    }

    render() {
        this.shipPlacementContainer = document.createElement('div');
        this.shipPlacementContainer.classList.add('ship-placement-container');

/*         if (this.gameboard.getShipsToPlace().length === 0) {
            this.shipPlacementContainer.classList.add('hidden');
        } */

        for (const shipToPlace of this.gameboard.getShipsToPlace()) {
            const shipDiv = document.createElement('div');
            shipDiv.classList.add('ship-to-place');
            shipDiv.draggable = true;
            for (let i = 0; i < shipToPlace; i++) {
                const shipCell = document.createElement('div');
                shipCell.classList.add('ship-to-place-cell');
                shipDiv.appendChild(shipCell);
            }

            this.shipPlacementContainer.appendChild(shipDiv);
        }

        return this.shipPlacementContainer;
    }
}