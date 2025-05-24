import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function Footer() {
  const styles = {
    section: {
      position: 'relative',
      overflow: 'hidden',               // overflow-hidden 
      paddingTop: '2.5rem',             // py-10 → 2.5rem 
      paddingBottom: '2.5rem',
      backgroundColor: '#9CA3AF',       // bg-gray-400 → #9CA3AF 
      borderTop: '2px solid #000000'    // border-t-2 border-t-black 
    },
    inner: {
      position: 'relative',
      zIndex: 10,
      margin: '0 auto',                // mx-auto :contentReference[oaicite:9]{index=9}
      maxWidth: '80rem',               // max-w-7xl → 80rem :contentReference[oaicite:10]{index=10}
      paddingLeft: '1rem',             // px-4 → 1rem :contentReference[oaicite:11]{index=11}
      paddingRight: '1rem'
    },
    row: {
      display: 'flex',                 // flex :contentReference[oaicite:12]{index=12}
      flexWrap: 'wrap',                // flex-wrap :contentReference[oaicite:13]{index=13}
      margin: '-0.375rem'              // -m-6 → -0.375rem margins to offset 0.375rem child padding
    },
    col: {
      padding: '0.375rem',             // p-6 → 1.5rem? Actually p-6 = 1.5rem, so child uses padding:1.5rem; negative margin above compensates.
      boxSizing: 'border-box'
    },
    // Responsive widths:
    colFull: { width: '100%' },        // w-full
    colHalf: { width: '50%' },         // md:w-1/2
    col5of12: { width: '41.666667%' }, // lg:w-5/12
    col2of12: { width: '16.666667%' }, // lg:w-2/12
    col3of12: { width: '25%' },        // lg:w-3/12

    // Typography
    heading: {
      fontSize: '0.75rem',             // text-xs → 0.75rem 
      fontWeight: 600,                 // font-semibold 
      textTransform: 'uppercase',      // uppercase 
      letterSpacing: '1px',            // tracking-px 
      marginBottom: '2.25rem',         // mb-9 → 2.25rem
      color: '#6B7280'                 // text-gray-500 → #6B7280 
    },
    link: {
      display: 'block',
      marginBottom: '1rem',            // mb-4 → 1rem
      fontSize: '1rem',                // text-base → 1rem :contentReference[oaicite:19]{index=19}
      fontWeight: 500,                 // font-medium
      color: '#111827',                // text-gray-900 → #111827
      textDecoration: 'none',
      transition: 'color 0.2s ease'
    },
    linkHover: {
      color: '#374151'                 // hover:text-gray-700 → #374151
    },
    copyright: {
      fontSize: '0.875rem',            // text-sm → 0.875rem
      color: '#4B5563'                 // text-gray-600 → #4B5563
    }
  };

  // Hover state for links
  const [hovered, setHovered] = React.useState(null);

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        <div style={styles.row}>
          {/* Logo & Copy */}
          <div style={{ ...styles.col, ...styles.colHalf, ...styles.col5of12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center' }}>
                <Logo width="100px" />
              </div>
              <div>
                <p style={styles.copyright}>
                  &copy; Copyright 2025. All Rights Reserved by Kousik.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div style={{ ...styles.col, ...styles.colHalf, ...styles.col2of12 }}>
            <div style={{ height: '100%' }}>
              <h3 style={styles.heading}>Company</h3>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {['Features','Pricing','Affiliate Program','Press Kit'].map((text, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      style={{
                        ...styles.link,
                        ...(hovered===`comp${i}` ? styles.linkHover : {})
                      }}
                      onMouseEnter={() => setHovered(`comp${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div style={{ ...styles.col, ...styles.colHalf, ...styles.col2of12 }}>
            <div style={{ height: '100%' }}>
              <h3 style={styles.heading}>Support</h3>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {['Account','Help','Contact Us','Customer Support'].map((text, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      style={{
                        ...styles.link,
                        ...(hovered===`sup${i}` ? styles.linkHover : {})
                      }}
                      onMouseEnter={() => setHovered(`sup${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legals Links */}
          <div style={{ ...styles.col, ...styles.colHalf, ...styles.col3of12 }}>
            <div style={{ height: '100%' }}>
              <h3 style={styles.heading}>Legals</h3>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {['Terms & Conditions','Privacy Policy','Licensing'].map((text, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      style={{
                        ...styles.link,
                        ...(hovered===`leg${i}` ? styles.linkHover : {})
                      }}
                      onMouseEnter={() => setHovered(`leg${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
