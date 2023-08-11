import { AuthAction } from '../reducers/authReducer';
import React, { Dispatch } from 'react';

interface AuthContextType {
  user: string;
  authDispatch: Dispatch<AuthAction>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;