import useAuth from '../auth/useAuth';
import { useContext } from 'react';
import TasksContext from './tasksContext';
import useAuthStore from '../auth/store';

const useTasks = () => useContext(TasksContext);

const TaskList = () => {
  const { tasks, taskDispatch } = useTasks();
  // const { user } = useAuth();
  const { user } = useAuthStore();
  return (
    <>
      <h3>{user}</h3>
      <button
        onClick={() =>
          taskDispatch({
            type: 'ADD_TASK',
            task: { title: 'New Task', id: Date.now() }
          })
        }
        className="btn btn-primary my-3"
      >
        Add Task
      </button>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="flex-grow-1">{task.title}</span>
            <button
              className="btn btn-outline-danger"
              onClick={() =>
                taskDispatch({
                  type: 'REMOVE_TASK',
                  taskId: task.id
                })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;
