import LoginStatus from './auth/LoginStatus';
import TasksContext from './tasks/tasksContext';
import { useContext } from 'react';

const NavBar = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <nav className="navbar d-flex justify-content-between">
      <span className="badge text-bg-secondary">{tasks.length}</span>
      <LoginStatus />
    </nav>
  );
};

export default NavBar;
