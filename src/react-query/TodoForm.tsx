import { useRef } from 'react';
import useAddToDo from './hooks/useAddToDo';

const TodoForm = () => {
  const addTodo = useAddToDo(() => {
    if (ref.current) ref.current.value = '';
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
            Add
          </button>
        </div>
      </form>
    </>

  );
};

export default TodoForm;
