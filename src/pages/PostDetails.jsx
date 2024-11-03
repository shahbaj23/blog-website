import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { FiEdit, FiTrash } from "react-icons/fi";
import Loading from "../components/Loading";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import AuthorId from "./AuthorId";
import Delete from "./Delete";

function PostDetails() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError("Failed to load post details.");
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  return (
    <section className="mx-auto md:w-[700px] bg-white my-4 py-3 px-9">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <AuthorId
            authorId={post.creator}
            createdAt={post.createdAt}
            category={post.category}
          />
        </div>
        {currentUser?.id === post.creator && (
          <div className="flex flex-row items-center">
            <Link to={`/edit-post/${id}`} className="text-2xl mr-3">
              <FiEdit />
            </Link>
            <div className="text-2xl">
            <Delete postId={id} redirectPath="/" />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center flex-col mt-3 mb-3">
        <h1 className="md:text-3xl mb-3 font-semibold">
          {post.title || "No Title"}
        </h1>
        {post.thumbnail && (
          <img
            className="md:w-[640px] h-[350px] object-cover mb-3"
            src={`http://localhost:8000/uploads/${post.thumbnail}`}
            alt={post.title || "Post Thumbnail"}
          />
        )}
        <p
          className="postDetail__p"
          dangerouslySetInnerHTML={{ __html: post.description }}
        ></p>
      </div>
    </section>
  );
}

export default PostDetails;

// const { postId } = useParams();
// const navigate = useNavigate();
// const index = parseInt(postId, 10);
// const post = posts[index];

// const { deletePost } = useContext(PostContext);

// if (!posts) {
//   return <div className="text-center text-red-500">Loading...</div>;
// }

// if (!post) {
//   return <div className="text-center text-red-500">Post not found.</div>;
// }

// const handleDelete = () => {
//   deletePost(post.id);
// };
// const handleEdit = () => {
//   navigate(`/edit-post/${postId}`);
// };
