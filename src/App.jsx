import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#cbd5e0'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  main: {
    flex: 1,
    padding: '1rem'
  },
  header: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0'
  },
  footer: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderTop: '1px solid #e2e8f0'
  }
};

function App() {
  const [loading, setLoading] = useState(true);  // Track auth load status
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));          // Always stop loading
  }, [dispatch]);

  if (loading) return null;                     // No UI until ready

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Header style={styles.header} />          {/* Pass header style */}
        <main style={styles.main}>
          <Outlet />
        </main>
        <Footer style={styles.footer} />          {/* Pass footer style */}
      </div>
    </div>
  );
}

export default App;
