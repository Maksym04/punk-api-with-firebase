import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {AuthProvider} from './components/auth/auth-context';
import {auth} from './firebase';
import PrivateRoute from './components/private/private-route';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import Register from './components/register/register';
import VerifyEmail from './components/verify-email/verify-email';
import Error from './components/error/error';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
    });
  });

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/verify-email' element={<VerifyEmail />} />
          <Route exact path='*' element={<Error />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
