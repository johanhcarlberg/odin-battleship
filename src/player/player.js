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
    const performedAttacks = [];
    const getPerformedAttacks = () => performedAttacks;
    const isAI = true;

    const hasPerformedAttack = (pos) => {
        const posString = JSON.stringify(pos);
        return performedAttacks.some((item) => {
            return JSON.stringify(item) === posString;
        })
    }

    const getNextAttack = () => {
        let x = Math.floor(Math.random() * player.gameBoard.getLength())
        let y = Math.floor(Math.random() * player.gameBoard.getLength())
        
        if (hasPerformedAttack([x,y])) {
            return getNextAttack();
        }
        performedAttacks.push([x,y]);
        return {x, y};
    }

    return {
        ...player,
        getNextAttack,
        getPerformedAttacks,
        isAI
    }
}

export const AIPlayer = () => {
    const player = Player();
    return pipe(
    isAIPlayer
    )(player)
}
