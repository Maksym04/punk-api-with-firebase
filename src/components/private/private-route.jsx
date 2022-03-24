import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuthValue} from '../auth/auth-context';

export default function PrivateRoute ({children}) {
  const {currentUser} = useAuthValue();

  if (!currentUser?.emailVerified) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
