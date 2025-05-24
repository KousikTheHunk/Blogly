import React from 'react';

export default function Logo({ width = '100px' }) {
  // Inline style object for the logo container
  const style = {
    width,                      // dynamic width as passed via props
    height: 'auto',             // maintain aspect ratio if using an SVG or image
    display: 'inline-block',    // shrink-wrap to content
    backgroundColor: '#f3f4f6', // light gray background (optional)
    textAlign: 'center',        // center the "Logo" text
    lineHeight: '1.5',          // comfortable vertical alignment
    fontWeight: 600             // semi-bold label
  };

  return <div style={style}>Logo</div>;
}
