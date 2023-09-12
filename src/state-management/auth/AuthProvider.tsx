import React, { useReducer } from 'react';
import AuthContext from './authContext';

interface LoginAction {
  type: 'LOGIN';
  username: string
}

interface LogoutAction {
  type: 'LOGOUT';
}

export type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: string, action: AuthAction): string => {
  if (action.type === 'LOGIN') {
    return action.username
  }
  if (action.type === 'LOGOUT') {
    return ''
  }
  return state;
}

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, authDispatch] = useReducer(authReducer, '');

  return (
    <AuthContext.Provider value={{ user, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider