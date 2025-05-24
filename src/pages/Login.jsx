import React from 'react';
import { Login as LoginComponent } from '../components';

export default function Login() {
  // Inline style object replacing Tailwind's py-8 (2rem top/bottom)
  const wrapperStyle = {
    paddingTop: '2rem',    // MDN: padding-top sets the top padding of an element :contentReference[oaicite:2]{index=2}
    paddingBottom: '2rem'
  };

  return (
    <div style={wrapperStyle}>
      <LoginComponent />
    </div>
  );
}
