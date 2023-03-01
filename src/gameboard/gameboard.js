export const GameboardFactory = (boardLength = 10) => {
    const createBoard = (length) => {
        let totalLength = length * length;
        console.log(totalLength);
        return new Array(totalLength);
    }
    let board = createBoard(boardLength)
    const getBoard = () => board;
    return {
        getBoard,
    }
}