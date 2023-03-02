import { ShipFactory } from "../ship/ship";

export const GameboardFactory = (boardLength = 10) => {
    const length = boardLength;
    const missedShots = [];
    const hits = [];
    const getMissedShots = ()  => missedShots;
    const getHits = () => hits;

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

    const _hitExists = (pos) => {
        const posString = JSON.stringify(pos);
        let containsHits = hits.some((e) => {
            return JSON.stringify(e) === posString;
        })
        return containsHits;
    }

    const _missExists = (pos) => {
        const posString = JSON.stringify(pos);
        let containsMiss = missedShots.some((e) => {
            return JSON.stringify(e) === posString;
        })
        return containsMiss;
    }

    const receiveAttack = (x, y) => {
        const pos = [x, y];
        if (_hitExists(pos) || _missExists(pos)) {
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
        const x = pos.x;
        const y = pos.y;
        const startIndex = getPos(x, y);
        let ship = ShipFactory(size);
        let newBoard = getBoard();
        for(let i = 0; i < ship.getLength(); i++) {
            newBoard[startIndex + i] = ship;
        }

        _setBoard(newBoard);
        return board;
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
    return {
        getBoard,
        getPos,
        placeShip,
        receiveAttack,
        getMissedShots,
        isAllSunk,
        getHits,
    }
}