import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import Delete from "./Delete";

function Dashboard() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.authToken;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const getAuthorPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/users/${id}`,
          { withCredentials: true }
        );
        setPosts(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getAuthorPost();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 space-y-4 md:mx-[120px]">
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <Link to={`post`}>
              <div className="flex items-center">
                <img
                  src={`http://localhost:8000/uploads/${post.thumbnail}`}
                  className="max-w-[70px] max-h-[60px] mr-4 rounded-md"
                  alt=""
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{post.title}</div>
                  <p className="text-xs text-gray-500">
                    Views: {post.views || 0}
                  </p>
                </div>
              </div>
            </Link>
            <div className="space-x-2 flex">
              <Link
                to={`/edit-post/${post._id}`}
                onClick={() => console.log("Edited")}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit />
              </Link>
              <div className="text-red-500 hover:text-red-700">
              <Delete postId={post._id} redirectPath={`/dashboard/${post._id}`} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center">No Posts Found</h1>
      )}
    </div>
  );
}

export default Dashboard;
