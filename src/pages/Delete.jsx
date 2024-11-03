import React, { useEffect, useContext } from "react";
import { FiTrash } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Context/AuthContext";

function Delete({postId: id, redirectPath}) {
  const navigate = useNavigate();
  const location = useLocation()
  // const { id } = useParams(); 
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.authToken;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8000/api/post/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        navigate(redirectPath); // Use redirectPath here
      }
    } catch (error) {
      console.error(error);
      alert("There was an error deleting the post.");
    }
  };

  return (
    <div>
      <button onClick={()=>handleDelete(id)}>
        <FiTrash />
      </button>
    </div>
  );
}

export default Delete;
