import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './hooks/useTodos';
import axios from 'axios';

interface AddTodoContext {
  previousTodos: Todo[]
}

const TodoForm = () => {
  const queryClient = useQueryClient()
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos9', todo)
        .then(res => res.data),

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];

      queryClient.setQueryData<Todo[]>(['todos'], (todos) => {
        return [newTodo, ...(todos || [])]
      })
      if (ref.current) ref.current.value = '';

      return { previousTodos }
    },
    onSuccess: (saveTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (todos) =>
        todos?.map((todo) => todo.id === newTodo.id ? saveTodo : todo))
    },
    onError: (error, newTodo: Todo, context) => {
      if (!context) return;

      queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos);
    }
  })
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error &&
        <div className="alert alert-danger">
          {addTodo.error.message}
        </div>
      }
      <form className="row mb-3" onSubmit={event => {
        event.preventDefault();
        addTodo.mutate({
          id: 0,
          title: ref.current?.value || '',
          completed: false,
          userId: 1
        })
      }}>
        <div className="col">
          <input ref={ref} type="text" className="form-control"/>
        </div>
        <div className="col">
          <button className="btn btn-primary">
            {addTodo.isLoading ? 'Saving...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </>

  );
};

export default TodoForm;
