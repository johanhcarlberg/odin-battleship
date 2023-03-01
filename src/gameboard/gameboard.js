export const GameboardFactory = (boardLength = 10) => {
    const length = boardLength;
    const createBoard = () => {
        let totalLength = length * length;
        return new Array(totalLength);
    }
    let board = createBoard()
    const getBoard = () => board;

    const _getIndexFromCoord = (x,y) => {
        return (length * y) + x
    }
    const getPos = (x, y) => {
        const index = _getIndexFromCoord(x, y);
        return index;
    }
    return {
        getBoard,
        getPos,
    }
}