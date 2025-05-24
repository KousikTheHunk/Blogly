import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Logo, LogoutBtn } from '../index';

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus }
  ];

  // Inline style definitions
  const styles = {
    header: {
      paddingTop: '0.75rem',                        // py-3 → 0.75rem 
      paddingBottom: '0.75rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',       // shadow → basic shadow 
      backgroundColor: '#6B7280'                   // bg-gray-500 → #6B7280 
    },
    nav: {
      display: 'flex',                              // flex → flex container 
      alignItems: 'center'
    },
    logoWrapper: {
      marginRight: '1rem'                           // mr-4 → 1rem 
    },
    navList: {
      display: 'flex',
      marginLeft: 'auto',                           // ml-auto → auto left margin 
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    navItem: {
      marginLeft: '0.5rem'                          // spacing between items 
    },
    button: {
      display: 'inline-block',
      padding: '0.5rem 1.5rem',                     // py-2 px-6 → 0.5rem 1.5rem 
      borderRadius: '9999px',                       // rounded-full → pill shape 
      transition: 'background-color 0.2s ease',     // duration-200 → 0.2s 
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
    },
    buttonHover: {
      backgroundColor: '#DBEAFE'                    // hover:bg-blue-100 → #DBEAFE 
    }
  };

  return (
    <header style={styles.header}>
      <Container>
        <nav style={styles.nav}>
          <div style={styles.logoWrapper}>
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul style={styles.navList}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} style={styles.navItem}>
                  <button
                    onClick={() => navigate(item.slug)}
                    style={{
                      ...styles.button,
                      ...(hovered === item.name ? styles.buttonHover : {})
                    }}
                    onMouseEnter={() => setHovered(item.name)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li style={styles.navItem}>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
