import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from './hooks/useTodos';
import axios from 'axios';

const TodoForm = () => {
  const queryClient = useQueryClient()
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', todo)
        .then(res => res.data),
    onSuccess: (saveTodo, newTddo) => {
      //approach 1: invalidate the cache
      // queryClient.invalidateQueries({
      //   queryKey: ['todos']
      // })

      //approach 2: update the cache
      queryClient.setQueryData<Todo[]>(['todos'], (todos) => {
        return [saveTodo, ...todos || []]
      })

      console.log(saveTodo)
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
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>

  );
};

export default TodoForm;
