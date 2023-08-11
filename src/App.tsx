import './App.css';
import { useReducer } from 'react';
import taskReducer from './state-management/reducers/taskReducer';
import NavBar from './state-management/NavBar';
import HomePage from './state-management/HomePage';
import TasksContext from './state-management/context/tasksContext';

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      <NavBar/>
      <HomePage/>
    </TasksContext.Provider>

  )
}

export default App;
