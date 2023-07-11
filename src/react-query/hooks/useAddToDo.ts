import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Todo } from './useTodos';
import { CACHE_KEY_TODOS } from '../contants';

interface AddTodoContext {
  previousTodos: Todo[]
}

const useAddToDo = (onAdd: () => void) => {
  const queryClient = useQueryClient()
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),

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