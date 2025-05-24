import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  // Inline style object replacing Tailwind utilities
  const styles = {
    button: {
      display: 'inline-block',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      backgroundColor: hovered ? '#EBF8FF' : 'transparent',
      transition: 'background-color 0.2s ease',
      border: 'none',
      cursor: 'pointer',
      font: 'inherit'
    }
  };

  return (
    <button
      onClick={logoutHandler}
      style={styles.button}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Logout
    </button>
  );
}
