import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

export default function PostCard({ $id, title, featuredImage }) {
  // Inline styles replacing Tailwind utilities
  const styles = {
    card: {
      width: '100%',                                    // w-full :contentReference[oaicite:0]{index=0}
      backgroundColor: 'rgb(243, 244, 246)',            // bg-gray-100 → rgb(243 244 246) :contentReference[oaicite:1]{index=1}
      borderRadius: '0.75rem',                          // rounded-xl → 0.75rem :contentReference[oaicite:2]{index=2}
      padding: '1rem',                                  // p-4 → 1rem 
      boxSizing: 'border-box',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block'
    },
    imageWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem'                              // mb-4 → 1rem 
    },
    image: {
      borderRadius: '0.75rem',                          // rounded-xl → 0.75rem 
      maxWidth: '100%',
      height: '200px',
      width: '300px',
      display: 'block',  
    },
    title: {
      fontSize: '1.25rem',                              // text-xl → 1.25rem 
      fontWeight: 700,                                  // font-bold → 700 
      margin: 0                                         // reset default margin
    }
  };

  return (
    <Link to={`/post/${$id}`} style={{ textDecoration: 'none' }}>
      <div style={styles.card}>
        <div style={styles.imageWrapper}>
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            style={styles.image}
          />
        </div>
        <h2 style={styles.title}>{title}</h2>
      </div>
    </Link>
  );
}
