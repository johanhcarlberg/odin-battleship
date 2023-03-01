export const ShipFactory = (shipLength = 2) => {
    let timesHit = 0;
    const getTimesHit = () => timesHit;

    let length = shipLength;
    const getLength = () => length;

    const hit = () => {
        if (isSunk()) {
            return;
        }
        timesHit++;
    }

    const isSunk = () => {
        return timesHit >= length;
    }

    return {
        getTimesHit,
        getLength,
        hit,
        isSunk,
    }
}