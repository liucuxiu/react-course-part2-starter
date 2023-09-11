import './App.css';
import { useReducer } from 'react';
import taskReducer from './state-management/reducers/taskReducer';
import NavBar from './state-management/NavBar';
import HomePage from './state-management/HomePage';
import TasksContext from './state-management/context/tasksContext';
import AuthProvider from './state-management/AuthProvider';

function App() {
  const [tasks, taskDispatch] = useReducer(taskReducer, [])

  return (
    <AuthProvider>
      <TasksContext.Provider value={{ tasks, taskDispatch }}>
        <NavBar/>
        <HomePage/>
      </TasksContext.Provider>
    </AuthProvider>


  )
}

export default App;
