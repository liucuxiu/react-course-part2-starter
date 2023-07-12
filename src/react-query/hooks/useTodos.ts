import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../contants';
import ApiClient  from '../../services/apiClient';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const apiClient = new ApiClient<Todo>('/todos');


const useTodos = () => {

  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS, // for caching
    queryFn: () => apiClient.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export default useTodos