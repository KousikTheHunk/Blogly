import React from 'react';
import { Signup as SignupComponent } from '../components';

export default function Signup() {
  // Define inline style for vertical padding
  const wrapperStyle = {
    paddingTop: '2rem',    // equivalent to Tailwind's py-8 
    paddingBottom: '2rem'
  };

  return (
    <div style={wrapperStyle}>
      <SignupComponent />
    </div>
  );
}
