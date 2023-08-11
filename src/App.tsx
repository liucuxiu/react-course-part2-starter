import './App.css';
import { useReducer } from 'react';
import taskReducer from './state-management/reducers/taskReducer';
import NavBar from './state-management/NavBar';
import HomePage from './state-management/HomePage';
import TasksContext from './state-management/context/tasksContext';
import authReducer from './state-management/reducers/authReducer';
import AuthContext from './state-management/context/authContext';

function App() {
  const [tasks, taskDispatch] = useReducer(taskReducer, [])
  const [user, authDispatch] = useReducer(authReducer, '');

  return (
    <AuthContext.Provider value={{ user, authDispatch }}>
      <TasksContext.Provider value={{ tasks, taskDispatch }}>
        <NavBar/>
        <HomePage/>
      </TasksContext.Provider>
    </AuthContext.Provider>


  )
}

export default App;
