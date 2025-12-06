import { Riddle } from '../service/RiddleService';

export const fetchRiddlesCollection = async (): Promise<Riddle[]> => {
    return fetch('http://localhost:3000/riddles').then((response) => response.json());
};

export const fetchRiddleById = async (id: string): Promise<Riddle> => {
    return fetch(`http://localhost:3000/riddles/${id}`).then((response) =>
        response.json(),
    );
};
