import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const create = async (data) => {
    setError('');
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const styles = {
    outer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '1rem',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '32rem',
      backgroundColor: '#f3f4f6',
      borderRadius: '0.75rem',
      padding: '2.5rem',
      border: '1px solid rgba(0,0,0,0.1)',
      boxSizing: 'border-box'
    },
    logoWrap: {
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'center'
    },
    heading: {
      textAlign: 'center',
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.25,
      margin: 0
    },
    subText: {
      marginTop: '0.5rem',
      textAlign: 'center',
      fontSize: '1rem',
      color: 'rgba(0,0,0,0.6)'
    },
    link: {
      fontWeight: 500,
      color: '#3b82f6',
      textDecoration: 'none',
      transition: 'all 0.2s ease'
    },
    linkHover: {
      textDecoration: 'underline'
    },
    error: {
      color: '#dc2626',
      marginTop: '2rem',
      textAlign: 'center'
    },
    form: {
      marginTop: '2rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'
    },
    submitBtn: {
      width: '100%'
    }
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={styles.outer}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <Logo width="100%" />
        </div>

        <h2 style={styles.heading}>Sign up to create account</h2>

        <p style={styles.subText}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ ...(styles.link), ...(hover ? styles.linkHover : {}) }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Sign In
          </Link>
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit(create)} style={styles.form}>
          <div style={styles.formGroup}>
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register('name', { required: true })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email address'
                }
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />
            <Button type="submit" style={styles.submitBtn}>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
