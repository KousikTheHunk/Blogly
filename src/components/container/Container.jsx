import React from 'react';

export default function Container({ children }) {
  // Inline style object replacing Tailwind utilities
  const styles = {
    width: '100%',                // w-full :contentReference[oaicite:4]{index=4}
    maxWidth: '80rem',            // max-w-7xl :contentReference[oaicite:5]{index=5}
    marginLeft: 'auto',           // mx-auto horizontal centering :contentReference[oaicite:6]{index=6}
    marginRight: 'auto',
    paddingLeft: '1rem',          // px-4 :contentReference[oaicite:7]{index=7}
    paddingRight: '1rem',
    boxSizing: 'border-box'       // ensure padding is included in width calculation :contentReference[oaicite:8]{index=8}
  };

  return <div style={styles}>{children}</div>;
}
