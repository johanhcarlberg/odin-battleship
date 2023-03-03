export const Game = () => {
    const player1 = Player();
    player1.gameBoard.generateBoard();
    const player2 = AIPlayer();
    player2.gameBoard.generateBoard();

    return {
        player1,
        player2
    }
}