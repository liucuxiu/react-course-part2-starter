import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../contants';

import todoService, { Todo } from '../../services/todoService';


const useTodos = () => {

  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS, // for caching
    queryFn: todoService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export default useTodos