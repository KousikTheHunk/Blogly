import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Default credentials — adjust as needed
  const DEFAULT_EMAIL = 'user@example.com';
  const DEFAULT_PASSWORD = 'password123';

  // Handler to auto‑fill form fields
  const fillDefaultCredentials = () => {
    setValue('email', DEFAULT_EMAIL, { shouldDirty: true });
    setValue('password', DEFAULT_PASSWORD, { shouldDirty: true });
  };

  // Inline style objects
  const styles = {
    outerWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',            // w-full 
      padding: '1rem'           // add some breathing room 
    },
    card: {
      margin: '0 auto',         // mx-auto
      width: '100%',            // w-full :
      maxWidth: '32rem',        // max-w-lg = 32rem 
      backgroundColor: '#f3f4f6', // bg-gray-100 
      borderRadius: '0.75rem',  // rounded-xl 
      padding: '2.5rem',        // p-10 = 2.5rem 
      border: '1px solid rgba(0,0,0,0.1)', // border border-black/10 
      boxSizing: 'border-box'
    },
    logoContainer: {
      marginBottom: '0.5rem',
      display: 'flex',
      justifyContent: 'center'
    },
    heading: {
      textAlign: 'center',
      fontSize: '1.5rem',       // text-2xl = 1.5rem 
      fontWeight: '700',
      lineHeight: '1.25',
      margin: 0
    },
    subText: {
      marginTop: '0.5rem',
      textAlign: 'center',
      fontSize: '1rem',
      color: 'rgba(0,0,0,0.6)'
    },
    link: {
      fontWeight: '500',
      color: '#3b82f6',         // text-primary 
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.2s ease'
    },
    linkHover: {
      textDecoration: 'underline'
    },
    errorText: {
      color: '#dc2626',         // text-red-600 
      marginTop: '2rem',
      textAlign: 'center'
    },
    form: {
      marginTop: '2rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem'            // space-y-5 = 1.25rem gap 
    },
    submitButton: {
      width: '100%'             // w-full 
    },
    defaultBtn: {
      marginTop: '1rem',
      width: '100%',
      backgroundColor: '#e5e7eb',
      color: '#111827',
      padding: '0.5rem',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '0.375rem',
    }
  };

  // Link hover state
  const [hoverLink, setHoverLink] = useState(false);

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <Logo width="100px" />
        </div>

        <h2 style={styles.heading}>Sign in to your account</h2>

        <p style={styles.subText}>
          Don&apos;t have any account?{' '}
          <Link
            to="/signup"
            style={{
              ...styles.link,
              ...(hoverLink ? styles.linkHover : {})
            }}
            onMouseEnter={() => setHoverLink(true)}
            onMouseLeave={() => setHoverLink(false)}
          >
            Sign Up
          </Link>
        </p>

        {error && <p style={styles.errorText}>{error}</p>}

        <form onSubmit={handleSubmit(login)} style={styles.form}>
          <div style={styles.formGroup}>
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email address must be valid'
                }
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            <Button type="submit" style={styles.submitButton}>
              Sign in
            </Button>
          </div>
        </form>

        {/* Default Credentials Button */}
        <button
          type="button"
          style={styles.defaultBtn}
          onClick={fillDefaultCredentials}
        >
          Use Default Credentials
        </button>

      </div>
    </div>
  );
}
