import TasksContext from './context/tasksContext';
import React, { useReducer } from 'react';
import taskReducer from './reducers/taskReducer';

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