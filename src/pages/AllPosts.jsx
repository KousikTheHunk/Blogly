import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((res) => {
      if (res && res.documents) {
        setPosts(res.documents);
      }
    });
  }, []);

  // Inline style objects
  const wrapperStyle = {
    width: '100%',
    paddingTop: '2rem',
    paddingBottom: '2rem',
  };

  const postsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '-0.5rem', // to counteract child padding
  };

  const postItemStyle = {
    padding: '0.5rem',
    width: '25%',       // one-quarter width
    boxSizing: 'border-box',
  };

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
