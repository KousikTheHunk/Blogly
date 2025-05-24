import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res && res.documents) {
        setPosts(res.documents);
      }
    });
  }, []);

  // Shared style objects
  const wrapperStyle = {
    width: '100%',
    paddingTop: '2rem',    // Tailwind's py-8
    paddingBottom: '2rem',
  };

  const emptyStyle = {
    ...wrapperStyle,
    marginTop: '1rem',     // Tailwind's mt-4
    textAlign: 'center',
  };

  const postsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-0.5rem',     // to negate child padding
  };

  const postItemStyle = {
    padding: '0.5rem',     // Tailwind's p-2
    width: '25%',          // Tailwind's w-1/4
    boxSizing: 'border-box',
  };

  const fullItemStyle = {
    padding: '0.5rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  const headingStyle = {
    fontSize: '1.5rem',    // Tailwind's text-2xl
    fontWeight: '700',     // Tailwind's font-bold
    cursor: 'pointer',
  };

  const headingHoverStyle = {
    color: '#6b7280',      // Tailwind's text-gray-500
  };

  // Track hover state for the empty-heading
  const [hover, setHover] = useState(false);

  if (posts.length === 0) {
    return (
      <div style={emptyStyle}>
        <Container>
          <div style={postsContainerStyle}>
            <div style={fullItemStyle}>
              <h1
                style={{
                  ...headingStyle,
                  ...(hover ? headingHoverStyle : {}),
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <Container>
        <div style={postsContainerStyle}>
          {posts.map((post) => (
            <div key={post.$id} style={postItemStyle}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
