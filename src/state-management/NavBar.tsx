import LoginStatus2 from './auth/LoginStatus2';
import TasksContext from './tasks/tasksContext';
import { useContext } from 'react';
import useCounterStore from './counter/store';

const NavBar = () => {
  const { tasks } = useContext(TasksContext);
  const  counter  = useCounterStore(s => s.counter);
  console.log('NavBar rendered');
  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{tasks.length}</span>
      <LoginStatus2 />

      <span className="badge text-bg-secondary">{counter}</span>
    </nav>
  );
};

export default NavBar;
