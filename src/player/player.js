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
    let performedAttacks = [];
    const getPerformedAttacks = () => performedAttacks;
    let queuedAttacks = [];
    const getQueuedAttacks = () => queuedAttacks;
    const isAI = true;

    const hasPerformedAttack = (pos) => {
        const posString = JSON.stringify(pos);
        return performedAttacks.some((item) => {
            return JSON.stringify(item) === posString;
        })
    }

    const hasQueuedAttack = (pos) => {
        const posString = JSON.stringify(pos);
        return queuedAttacks.some((item) => {
            return JSON.stringify(item) === posString;
        })
    }

    // Gets next AI attack
    // Gets attack from queue if the queue is not empty
    const getNextAttack = () => {
        if (queuedAttacks.length > 0) {
            const attack = queuedAttacks.shift();
            let x = attack[0];
            let y = attack[1];
            performedAttacks.push([x,y]);
            return {x, y};
        }

        let x = Math.floor(Math.random() * player.gameBoard.getLength())
        let y = Math.floor(Math.random() * player.gameBoard.getLength())
        
        if (hasPerformedAttack([x,y])) {
            return getNextAttack();
        }
        performedAttacks.push([x,y]);
        return {x, y};
    }

    // Queues an attack if it hasn't been performed and it isn't already in queue
    const queueAttack = (x, y) => {
        if (hasPerformedAttack([x,y]) || hasQueuedAttack([x,y])) {
            return;
        }

        queuedAttacks.push([x,y]);
    }

    const reset = () => {
        queuedAttacks = [];
        performedAttacks = [];
    }

    return {
        ...player,
        getNextAttack,
        getPerformedAttacks,
        isAI,
        getQueuedAttacks,
        queueAttack,
        reset,
    }
}

export const AIPlayer = () => {
    const player = Player();
    return pipe(
    isAIPlayer
    )(player)
}
