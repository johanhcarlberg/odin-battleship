import { ShipFactory } from "../ship/ship";

export const GameboardFactory = (boardLength = 10) => {
    const length = boardLength;
    const getLength = () => length;

    const missedShots = [];
    const hits = [];
    const getMissedShots = ()  => missedShots;
    const getHits = () => hits;

    const ships = [];

    const createBoard = () => {
        let totalLength = length * length;
        return new Array(totalLength);
    }
    let board = createBoard()
    const getBoard = () => board;
    const _setBoard = (newBoard) => board = newBoard;

    const _getIndexFromCoord = (x,y) => {
        return (length * y) + x
    }
    const getPos = (x, y) => {
        const index = _getIndexFromCoord(x, y);
        return index;
    }

    const _setPos = (x, y, data) => {
        const index = getPos(x, y);
        index = data;
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

    const receiveAttack = (x, y) => {
        const pos = [x, y];
        if (!isValidPosition(pos)) {
            throw new Error(`Invalid position: ${pos}`);
        }
        if (hitExists(pos) || missExists(pos)) {
            return;
        }

        const ship = board[getPos(x,y)];
        if (ship && ship.hit) {
            hits.push(pos);
            ship.hit();
        } else {
            missedShots.push(pos);
        }
    }

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
        return ship;
    }

    const _isShipPositionValid = (size, pos) => {
        for (let i = 0; i < size; i++) {
            let x = pos.x + i;
            let y = pos.y + i;
            if (x > length - 1 || y > length - 1) {
                return false;
            }
            let boardIndex = getPos(pos.x + i, pos.y);
            if (getBoard()[boardIndex]) {
                return false;
            }
        }
        return true;
    }

    const isAllSunk = () => {
        for (const pos of board) {
            if(pos && pos.isSunk) {
                if (!pos.isSunk()) {
                    return false;
                }
            }
        }
        return true;
    }

    const generateBoard = () => {
        const shipsToCreate = [2, 2, 2, 3, 3, 4];
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
        getLength
    }
}