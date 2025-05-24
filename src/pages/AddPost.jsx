import React from 'react';
import { Container, PostForm } from '../components';

export default function AddPost() {
  // Define an inline style object for vertical padding
  const wrapperStyle = {
    paddingTop: '2rem',    // 8 × 0.25rem = 2rem
    paddingBottom: '2rem'
  };

  return (
    <div style={wrapperStyle}>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}