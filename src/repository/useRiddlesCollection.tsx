import { useQuery } from '@tanstack/react-query';
import { fetchRiddlesCollection } from '../adapter/RiddleAdpater';

export const useRiddlesCollection = () => {
    const { data = [] } = useQuery({
        queryKey: ['riddles'],
        queryFn: fetchRiddlesCollection,
    });
    return { collection: data };
};
