import React, { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const addNewPost = (newPost) => {
    const postWithId = { ...newPost, id: Date.now() };
    const updatedPosts = [...posts, postWithId];
    setPosts(updatedPosts);
  };

  const handleImageChange = (files) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (validFiles.length !== files.length) {
      setError("Please upload only image files.");
      return;
    }

    const imagePromises = validFiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((base64Images) => {
        setImages(base64Images);
        setError("");
      })
      .catch(() => setError("Error processing images."));
  };

  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const editPost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addNewPost,
        handleImageChange,
        images,
        error,
        deletePost,
        editPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
