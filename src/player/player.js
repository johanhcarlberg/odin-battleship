import { GameboardFactory } from "../gameboard/gameboard";

export const Player = () => {
    let gameBoard = GameboardFactory();
    return {
        gameBoard,
    };
}