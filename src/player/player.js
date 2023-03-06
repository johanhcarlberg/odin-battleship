import { GameboardFactory } from "../gameboard/gameboard";
import { pipe } from "rambda";

export const Player = () => {
    let gameBoard = GameboardFactory();
    let isCurrentPlayer = false;
    const getIsCurrentPlayer = () => isCurrentPlayer;
    const setIsCurrentPlayer = (status) => isCurrentPlayer = status;
    const toggleIsCurrentPlayer = () => setIsCurrentPlayer(!isCurrentPlayer);
    return {
        gameBoard,
        getIsCurrentPlayer,
        setIsCurrentPlayer,
        toggleIsCurrentPlayer,
    };
}

const isAIPlayer = (player = {}) => {
    const getNextAttack = () => {
        let x = Math.floor(Math.random() * (Math.pow(10, 2)))
        let y = Math.floor(Math.random() * (Math.pow(10, 2)))
        return {
            x,
            y,
            isAI: true,
        }
    }

    return {
        ...player,
        getNextAttack
    }
}

export const AIPlayer = () => {
    const player = Player();
    return pipe(
    isAIPlayer
    )(player)
}
