import { Riddle, getRandomRiddleId } from './RiddleService';

export enum ResolutionState {
    Correct = 'correct',
    Wrong = 'wrong',
    Undefined = 'undefined',
}

export type RiddleAnswer = { id: string; text: string };

export type ResolveRiddleViewAnswer = {
    id: string;
    text: string;
    isClickable: boolean;
    isCorrectSelected: boolean;
    isWrongSelected: boolean;
};

export type ResolveRiddleViewModel = {
    contentsHtml?: string;
    answers: ResolveRiddleViewAnswer[];
    randomRiddleId?: string;
    state: ResolutionState;
    canPlayAgain: boolean;
};

export const shuffleAnswers = (answers: RiddleAnswer[]): RiddleAnswer[] => {
    const copy = [...answers];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const swap = copy[i];
        copy[i] = copy[j];
        copy[j] = swap;
    }
    return copy;
};

export const computeResolutionState = (
    selectedId?: string,
    correctId?: string,
): ResolutionState => {
    if (!selectedId || !correctId) return ResolutionState.Undefined;
    return selectedId === correctId ? ResolutionState.Correct : ResolutionState.Wrong;
};

export const createResolveRiddleViewModel = (
    riddles: Riddle[],
    params: {
        riddle?: Riddle;
        shuffledAnswers: RiddleAnswer[];
        selectedId?: string;
        correctId?: string;
    },
): ResolveRiddleViewModel => {
    const { riddle, shuffledAnswers, selectedId, correctId } = params;
    const state = computeResolutionState(selectedId, correctId);

    const answers: ResolveRiddleViewAnswer[] = shuffledAnswers.map((answer) => ({
        id: answer.id,
        text: answer.text,
        isClickable: state === ResolutionState.Undefined,
        isCorrectSelected: state === ResolutionState.Correct && selectedId === answer.id,
        isWrongSelected: state === ResolutionState.Wrong && selectedId === answer.id,
    }));

    const randomRiddleId = getRandomRiddleId(riddles);

    return {
        contentsHtml: riddle?.contents,
        answers,
        randomRiddleId,
        state,
        canPlayAgain: state !== ResolutionState.Undefined,
    };
};
