import React, { useState , useEffect , useRef } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { clearPosts } from '../../store/postSlice';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  //const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();


  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      dispatch(clearPosts());
      navigate('/');
    });
  };

  // Inline style object replacing Tailwind utilities
  /*const styles = {
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
  );*/


// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const styles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  dropdown: {
    position: 'absolute',
    top: '110%',
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    width: '150px',
    zIndex: 1000,
  },
  item: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  itemHover: {
    backgroundColor: '#f3f4f6',
  },
};

return (
  <div style={styles.container} ref={menuRef}>
    <button
      onClick={() => setOpen((o) => !o)}
      style={styles.button}
    >
      {user?.name ? `Hello, ${user.name}` : 'Account'} ▾
    </button>

    {open && (
      <div style={styles.dropdown}>
        <div
          style={styles.item}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.itemHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          onClick={logoutHandler}
        >
          Logout
        </div>
      </div>
    )}
  </div>
);



} 
