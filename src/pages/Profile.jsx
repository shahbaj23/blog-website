import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import dummy from "../images/mern-blog-assets-main/dummy.jpg";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiImageEditLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import AuthContext from "../Context/AuthContext";
import axios from "axios";

function Profile() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newConfirmPassword, setNewConfirmPassword] = useState("")
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState('')
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [isAvatarSaved, setIsAvatarSaved] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const token = currentUser?.authToken;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const toggleNameEdit = () => {
    setIsEditingName(!isEditingName);
  };

  const togglePasswordEdit = () => {
    setIsEditingPassword(!isEditingPassword);
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files);
    setIsAvatarTouched(true);
    setIsAvatarSaved(false); 
  };

  useEffect(()=>{
    try {
      const getUser = async()=>{
        const response = await axios.get(`http://localhost:8000/api/user/${currentUser.id}`, {withCredentials: true, headers:{Authorization: `Bearer${token}`}})
        const {name, email, avatar} = response.data
        setName(name)
        setEmail(email)
        setAvatar(avatar)
      }
      getUser()
    } catch (error) {
      
    }
  },[])

  const handleUpdate = async(e)=>{
    e.preventDefault()

    try {
      const userData = new FormData()
      userData.set('name', name)
      userData.set('password', password)
      userData.set('newPassword', newPassword)
      userData.set('newConfrimPassword', newConfirmPassword)
  
      const response = await axios.patch(`http://localhost:8000/api/user/edit-user`, userData, {withCredentials: true, headers:{Authorization: `Bearer ${token}`}})
      if(response.status === 200){
        navigate('/login')
      }

    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleAvatarChange = async () => {
    if (!avatar || !avatar[0]) return;

    const formData = new FormData();
    formData.append("avatar", avatar[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/change-avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setAvatar(response.data.avatar); 
        setIsAvatarTouched(false);
        setIsAvatarSaved(true);
      } else {
        console.error(response.data.message);
        setIsAvatarSaved(false);
      }
    } catch (error) {
      console.error("Failed to upload avatar:", error);
      setIsAvatarSaved(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-gray-100">
      <div className="md:w-[750px] h-[400px] bg-white rounded-lg shadow-lg flex overflow-hidden">
        <div className="w-[250px] h-full flex flex-col items-center justify-center custom-gradient">
      
          <Link
            to={"/"}
            className="text-3xl text-white mb-2 hover:text-slate-400 hover:underline"
          >
            Posts
          </Link>
          <img
            src={`http://localhost:8000/uploads/${avatar}` || dummy}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-8 border-white"
            alt="User Avatar"
          />
          <div className="relative bottom-[57px] left-[46px] bg-white rounded-full p-2 cursor-pointer">
            <form>
              <label htmlFor="avatar-upload">
                <RiImageEditLine className="cursor-pointer" />
              </label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                onChange={handleFileChange}
                accept="image/png, image/jpg, image/jpeg"
              />
            </form>
            {isAvatarTouched && (
              <button onClick={handleAvatarChange}>
                <FaCheck className={isAvatarSaved ? "text-green-500" : ""} />
              </button>
            )}
          </div>

          <h1 className="font-bold text-2xl text-white text-center">{name}</h1>
        </div>

        <div className="flex flex-col justify-center items-start p-10 w-full bg-white">
        {error && <p className="text-red-500 text-center">{error}</p>}
          <h2 className="text-3xl font-semibold mb-4">Personal Information</h2>
          <p className="text-lg mb-2 flex items-center">
            <form action="">
              
            </form>
            <span className="font-bold mr-2">Name:</span>

            {isEditingName ? (
              <input
                type="text"
                className="border rounded px-2"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            ) : (
              name
            )}
            <CiEdit className="ml-2 cursor-pointer" onClick={toggleNameEdit} />
          </p>
          <p className="text-lg mb-2">
            <span className="font-bold">Email:</span> {email}
          </p>
          <div className="text-lg font-bold flex items-center gap-2">
            Change Password
            <CiEdit className="cursor-pointer" onClick={togglePasswordEdit} />
          </div>
          {isEditingPassword && (
            <div className="mt-2 space-y-2">
              <input
                type="password"
                placeholder="Current Password"
                className="border rounded px-2 w-full"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                className="border rounded px-2 w-full"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="border rounded px-2 w-full"
                value={newConfirmPassword}
                onChange={(e)=>setNewConfirmPassword(e.target.value)}
              />
            </div>
            )}
              <button
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Save
              </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
