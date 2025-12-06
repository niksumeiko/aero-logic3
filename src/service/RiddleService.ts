export type Riddle = {
    id: string;
    contents: string;
    answers: {
        id: string;
        text: string;
    }[];
};

export const getRandomRiddleId = (riddles: Riddle[]) => {
    const ids = riddles.map(({ id: riddleId }) => riddleId);
    const id = ids[Math.floor(Math.random() * ids.length)];

    return id;
};
