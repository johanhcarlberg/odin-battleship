import { GameboardFactory } from "../gameboard/gameboard";
import { pipe } from "rambda";

export const Player = () => {
    let gameBoard = GameboardFactory()
    return {
        gameBoard,
    };
}

const isAIPlayer = () => {
    const getNextAttack = () => {
        let x = Math.floor(Math.random() * (Math.pow(10, 2)))
        let y = Math.floor(Math.random() * (Math.pow(10, 2)))
        return {
            x,
            y,
        }
    }

    return {
        getNextAttack
    }
}

export const AIPlayer = pipe(
    Player,
    isAIPlayer
);