import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import { Toaster } from 'react-hot-toast';
function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('userToken');
    return token ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/edit/:id" 
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          } 
        />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(to right, #4ade80, #22c55e)',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(to right, #f87171, #ef4444)',
              color: 'white',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;