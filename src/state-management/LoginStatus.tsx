import { useContext } from "react";
import authContext from './context/authContext';

const LoginStatus = () => {
  const { user, authDispatch } = useContext(authContext);
  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => authDispatch({
            type: 'LOGOUT'
          })} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={() => authDispatch({
        type: 'LOGIN',
        username: 'mosh.hamedani'
      })} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
