import { ShipFactory } from "../ship/ship";

export const GameboardFactory = (boardLength = 10) => {
    const length = boardLength;
    const getLength = () => length;

    let missedShots = [];
    let hits = [];
    const getMissedShots = ()  => missedShots;
    const getHits = () => hits;

    let shipsToPlace = [2, 2, 2, 3, 3, 4];
    const getShipsToPlace = () => shipsToPlace;

    const ships = [];

    const createBoard = () => {
        let totalLength = length * length;
        return new Array(totalLength);
    }
    let board = createBoard()
    const getBoard = () => board;
    const _setBoard = (newBoard) => board = newBoard;
    const resetBoard = () => {
        board = createBoard();
        missedShots = [];
        hits = [];
        shipsToPlace = [2, 2, 2, 3, 3, 4];
    }

    // Returns gameboard index from x,y coordinates
    const _getIndexFromCoord = (x,y) => {
        return (length * y) + x
    }

    const getPos = (x, y) => {
        const index = _getIndexFromCoord(x, y);
        return index;
    }

    const hitExists = (pos) => {
        const posString = JSON.stringify(pos);
        let containsHits = hits.some((e) => {
            return JSON.stringify(e) === posString;
        })
        return containsHits;
    }

    const missExists = (pos) => {
        const posString = JSON.stringify(pos);
        let containsMiss = missedShots.some((e) => {
            return JSON.stringify(e) === posString;
        })
        return containsMiss;
    }

    // Handles receiving attacks on gameboard
    // Returns true if attack hits, false if misses
    // Throws if position argument is invalid
    const receiveAttack = (x, y) => {
        const pos = [x, y];
        if (!isValidPosition(pos)) {
            throw new Error(`Invalid position: ${pos}`);
        }

        if (hitExists(pos) || missExists(pos)) {
            return false;
        }

        const ship = board[getPos(x,y)];
        if (ship && ship.hit) {
            hits.push(pos);
            ship.hit();
            return true;
        } else {
            missedShots.push(pos);
            return false;
        }
    }

    // Handles ship placement
    // Returns ship object if ship can be placed
    // Throws if position or size is invalid or if a ship already exists on the position
    const placeShip = (size, pos) => {
        if (pos.x == null || pos.y == null) {
            throw new Error('Invalid position argument');
        }

        const x = pos.x;
        const y = pos.y;
        const startIndex = getPos(x, y);
        if (!_isShipPositionValid(size, pos)) {
            throw new Error('Position already has ship');
        }
        let ship = ShipFactory(size);
        ships.push(ship);

        let newBoard = getBoard();
        for(let i = 0; i < ship.getLength(); i++) {
            newBoard[startIndex + i] = ship;
        }

        _setBoard(newBoard);
        const shipsToPlaceIndex = shipsToPlace.indexOf(size);
        if (shipsToPlaceIndex === -1) {
            throw new Error('No ships remaining of given ship size');
        }
        shipsToPlace.splice(shipsToPlaceIndex, 1);
        return ship;
    }

    // Checks if a ship with given size can be placed on a given position
    const _isShipPositionValid = (size, pos) => {
        for (let i = 0; i < size; i++) {
            let x = pos.x + i;
            let y = pos.y;
            if (x > length - 1 || y > length - 1) {
                return false;
            }
            let boardIndex = getPos(x, y);
            if (getBoard()[boardIndex]) {
                return false;
            }
        }
        return true;
    }

    const isAllSunk = () => {
        if (isEmpty()) {
            return false;
        }

        for (const pos of board) {
            if(pos && pos.isSunk) {
                if (!pos.isSunk()) {
                    return false;
                }
            }
        }
        return true;
    }

    // Places ships randomly on the board
    const generateBoard = () => {
        const shipsToCreate = Array.from(shipsToPlace);
        const shipsCreated = [];
        while (shipsToCreate.length > 0) {
            const newShipSize = shipsToCreate.shift();
            const newShipPos = _getValidRandomShipPosition(newShipSize);
            placeShip(newShipSize, newShipPos);
            shipsCreated.push({x: newShipPos.x, y: newShipPos.y});
        }
        return shipsCreated;
    }

    const _getValidRandomShipPosition = (size) => {
        let x = Math.floor((Math.random() * length));
        let y = Math.floor(Math.random() * length);
        while(!_isShipPositionValid(size, {x, y})) {
            x = Math.floor((Math.random() * length));
            y = Math.floor(Math.random() * length);
        }
        return {x, y};
    }

    const getCoordsFromIndex = (index) => {
        const x = index % length;
        const y = Math.floor(index / length);

        return [x, y];
    }

    const getShips = () => {
        return ships;
    }

    const isValidPosition = (pos) => {
        if (pos[0] < 0 || pos[1] < 0) {
            return false;
        }

        if (pos[0] > length - 1 || pos[1] > length - 1) {
            return false;
        }

        return true;
    }

    const isEmpty = () => {
        for (let item of board) {
            if (item) {
                return false;
            }
        }
        return true;
    }

    return {
        getBoard,
        getPos,
        placeShip,
        receiveAttack,
        getMissedShots,
        isAllSunk,
        getHits,
        generateBoard,
        getCoordsFromIndex,
        getShips,
        hitExists,
        missExists,
        getLength,
        getShipsToPlace,
        resetBoard,
        isValidPosition
    }
}