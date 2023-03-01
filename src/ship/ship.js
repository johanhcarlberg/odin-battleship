export const ShipFactory = (shipLength = 2) => {
    let isAlive = true;
    const getIsAlive = () => isAlive;

    let timesHit = 0;
    const getTimesHit = () => timesHit;

    let length = shipLength;
    const getLength = () => length;

    const _destroy = () => {
        isAlive = false;
    }

    const hit = () => {
        if (!isAlive) {
            return;
        }
        timesHit++;
        if (timesHit >= length) {
            _destroy();
        }
    }
    return {
        getTimesHit,
        getLength,
        getIsAlive,
        hit,
    }
}