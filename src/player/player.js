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
        let x = Math.floor(Math.random() * player.gameBoard.getLength())
        let y = Math.floor(Math.random() * player.gameBoard.getLength())
        return {x, y};
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
