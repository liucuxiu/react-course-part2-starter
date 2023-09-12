import useAuth from './useAuth';

const LoginStatus = () => {
  const { user, authDispatch } = useAuth();
  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => authDispatch({
            type: 'LOGOUT'
          })} href="src/state-management/auth/LoginStatus#">
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
      })} href="src/state-management/auth/LoginStatus#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
