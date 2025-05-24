import React, { useEffect, useState } from "react";  
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    // Redirect if there's no slug
    if (!slug) {
      navigate("/");
      return;
    }
    // Fetch the post
    appwriteService.getPost(slug).then((data) => {
      if (data) setPost(data);
      else navigate("/");
    });
  }, [slug, navigate]);  // slug and navigate are correct dependencies :contentReference[oaicite:1]{index=1}

  const deletePost = () => {
    if (!post) return;  // Guard against null
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  // Inline styles object
  const styles = {
    wrapper: {
      paddingTop: "2rem",
      paddingBottom: "2rem"
    },
    imageContainer: {
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: "1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "0.75rem",
      padding: "0.5rem",
      boxSizing: "border-box"
    },
    image: {
      borderRadius: "0.75rem",
      maxWidth: "100%",
      height: '480px',
      width: '600px'
    },
    actions: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      display: "flex",
      gap: "0.75rem"
    },
    titleContainer: {
      width: "100%",
      marginBottom: "1.5rem"
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: 700,
      margin: 0
    },
    content: {}
  };

  if (!post) return null;

  return (
    <div style={styles.wrapper}>
      <Container>
        <div style={styles.imageContainer}>
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            style={styles.image}
          />

          {isAuthor && (
            <div style={styles.actions}>
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  style={{ 
                    backgroundColor: "#22C55E",   /* Tailwind bg-green-500 */ 
                    color: "white",
                    marginRight: "0.75rem"
                  }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                style={{
                  backgroundColor: "#EF4444",    /* Tailwind bg-red-500 */ 
                  color: "white"
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div style={styles.titleContainer}>
          <h1 style={styles.title}>{post.title}</h1>
        </div>

        <div style={styles.content}>{parse(post.content)}</div>
      </Container>
    </div>
  );
}
