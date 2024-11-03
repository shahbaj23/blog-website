import { useContext, useEffect, useState, useRef } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const categorized = [
  "Agriculture",
  "Business",
  "Technology",
  "Education",
  "Entertainment",
  "Weather",
  "Sport",
];

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};



const formats = [
  'header', 
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.authToken;


  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);
    console.log(...postData)

    try {
      const response = await axios.post(
        `http://localhost:8000/api/post`, 
        postData, 
        {
          withCredentials: true, 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="md:w-full">
      <h1 className="text-3xl font-bold text-center mt-8">
        Create Post
      </h1>
      <div className="flex justify-center my-5">
        <div className="w-[600px] mx-auto bg-white flex-col px-5 py-10">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="px-3 py-2 font-bold mb-4 border border-gray-300 rounded-md w-full outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 mb-4 border border-gray-300 font-semibold rounded-md w-full outline-none"
            >
              <option value="uncategorized">Select Category</option>
              {categorized.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <ReactQuill 
              className="overflow-scroll h-56 mb-4" 
              modules={modules} 
              formats={formats} 
              value={description} 
              onChange={setDescription} 
              placeholder="Type your Post"
            />

            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="my-4 block"
              accept="image/png, image/jpg, image/jpeg"
            />

            <button
              type="submit"
              className="text-2xl text-white font-semibold py-1 px-2 rounded-md mt-3 bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
