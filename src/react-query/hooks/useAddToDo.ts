import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../contants';
import todoService, { Todo } from '../../services/todoService';

interface AddTodoContext {
  previousTodos: Todo[]
}

const useAddToDo = (onAdd: () => void) => {
  const queryClient = useQueryClient()
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,

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