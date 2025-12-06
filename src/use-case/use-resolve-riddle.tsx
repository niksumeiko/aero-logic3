import { useMemo, useState } from 'react';
import { useRiddleById } from '../repository/useRiddleById';
import { useRiddlesCollection } from '../repository/useRiddlesCollection';
import {
    createResolveRiddleViewModel,
    shuffleAnswers,
} from '../service/ResolveRiddleService';
import { getAnswerFor } from 'riddle-exam';

export const useResolveRiddle = (id: string) => {
    const { collection } = useRiddlesCollection();
    const { riddle, isRiddleLoading } = useRiddleById(id);

    const [selected, setSelected] = useState<string>();
    const [correct, setCorrect] = useState<{ id: string }>();

    const handleClick = async (id: string) => {
        if (selected) {
            return;
        }

        setSelected(id);

        const data = await getAnswerFor(riddle!.id);

        setCorrect(data);
    };

    const shuffled = useMemo(
        () => shuffleAnswers(riddle?.answers ?? []),
        [riddle?.answers],
    );

    const model = createResolveRiddleViewModel(collection, {
        riddle,
        shuffledAnswers: shuffled,
        selectedId: selected,
        correctId: correct?.id,
    });

    return { ...model, isRiddleLoading, handleClick };
};
