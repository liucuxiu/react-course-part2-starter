import './App.css';
import TodoForm from './react-query/TodoForm';
import TodoList from './react-query/TodoList';
import Counter from './state-management/Counter';
import TaskList from './state-management/TaskList';
import LoginStatus from './state-management/LoginStatus';

function App() {
  return (
    <>
      <LoginStatus/>
      <TaskList/>
      <Counter/>
      <TodoForm/>
      <TodoList/>
    </>

  )
}

export default App;
