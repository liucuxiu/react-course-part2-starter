import TasksContext from './tasksContext';
import React, { useReducer } from 'react';

export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: 'ADD_TASK';
  task: Task;
}

interface RemoveTask {
  type: 'REMOVE_TASK';
  taskId: number;
}

export type TaskAction = AddTask | RemoveTask;

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.taskId);
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode
}

const TasksProvider = ({ children }: Props) => {
  const [tasks, taskDispatch] = useReducer(taskReducer, [])

  return (
    <TasksContext.Provider value={{ tasks, taskDispatch }}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider