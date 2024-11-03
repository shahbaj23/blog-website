import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Authors from "./pages/Authors";
import Logout from "./pages/Logout";
import Category from "./pages/Category";
import ErrorPage from "./pages/ErrorPage";
import PostDetails from "./pages/PostDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import AuthorPost from "./components/AuthorPost";

export default function App() {
  return (
    <div className="bg-gray-300">
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/posts/users/:id" element={<AuthorPost/>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/edit-post/:id" element={<EditPost  />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/author" element={<Authors />} />
        <Route path="/post/category/:category" element={<Category />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />

        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
