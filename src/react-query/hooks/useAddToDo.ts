import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './useTodos';
import { CACHE_KEY_TODOS } from '../contants';
import ApiClient from '../../services/apiClient';

const apiClient = new ApiClient<Todo>('/todos');

interface AddTodoContext {
  previousTodos: Todo[]
}

const useAddToDo = (onAdd: () => void) => {
  const queryClient = useQueryClient()
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: apiClient.post,

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => {
        return [newTodo, ...(todos)]
      })
      onAdd();

      return { previousTodos }
    },
    onSuccess: (saveTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => todo.id === newTodo.id ? saveTodo : todo))
    },
    onError: (error, newTodo: Todo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    }
  })
}

export default useAddToDo;