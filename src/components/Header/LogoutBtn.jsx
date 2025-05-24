import React, { useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const [hovered, setHovered] = useState(false);

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  // Inline style object replacing Tailwind utilities
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',       // center both items
      backgroundColor: '#f9fafb',  // light gray background
      padding: '1rem',             // inner padding
      borderRadius: '0.5rem',      // rounded corners
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)', // subtle shadow
      maxWidth: '200px',           // constrain width
      margin: '1rem auto',         // center in parent
      fontFamily: 'Arial, sans-serif',
    },
    username: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.75rem',
    },
    button: {
      padding: '0.5rem 1.25rem',
      borderRadius: '9999px',
      backgroundColor: hovered ? '#e2f0ff' : '#fff',
      color: '#007bff',
      border: '1px solid #007bff',
      transition: 'background-color 0.2s ease, color 0.2s ease',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '500',
      width: '100%',               // full width of container
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      {user?.name && <span style={styles.username}>Hello, {user.name}</span>}
      <button
        onClick={logoutHandler}
        style={styles.button}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Logout
      </button>
    </div>
  );
}
