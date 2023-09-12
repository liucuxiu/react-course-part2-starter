import { Task, TaskAction } from './TaskProvider';
import React, { Dispatch } from 'react';

interface TasksContextType {
  tasks: Task[];
  taskDispatch: Dispatch<TaskAction>;
}

const TasksContext = React.createContext<TasksContextType>({} as TasksContextType);

export default TasksContext;