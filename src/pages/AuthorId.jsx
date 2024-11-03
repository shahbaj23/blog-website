import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Link } from "react-router-dom";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function AuthorId({ authorId, createdAt }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${authorId}`
        );
        setAuthor(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (authorId) {
      getAuthor();
    }
  }, [authorId]);

  return (
    <div>
      {/* Author Info */}
      <Link to={`/posts/users/${authorId}`}>
        <div className="flex items-center space-x-2">
          <img
            src={
              author
                ? `http://localhost:8000/uploads/${author.avatar}`
                : "https://via.placeholder.com/30"
            }
            alt={author ? author.name : "Author"}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-medium text-gray-800">
              {author ? author.name : "Unknown Author"}
            </h2>
            <small className="text-xs text-gray-500">
              {createdAt ? (
                <ReactTimeAgo date={new Date(createdAt)} locale="en" />
              ) : (
                "Date not available"
              )}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AuthorId;
