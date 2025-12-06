import { useQuery } from '@tanstack/react-query';
import { fetchRiddleById } from '../adapter/RiddleAdpater';

export const useRiddleById = (id: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ['riddle', id],
        queryFn: () => fetchRiddleById(id),
    });

    return { riddle: data, isRiddleLoading: isLoading };
};
