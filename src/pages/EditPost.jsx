import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((postData) => {
        if (postData) {
          setPost(postData);
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  const wrapperStyle = {
    paddingTop: '2rem',    // equivalent to Tailwind's py-8
    paddingBottom: '2rem'
  };

  return post ? (
    <div style={wrapperStyle}>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
