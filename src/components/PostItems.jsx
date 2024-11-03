import React from "react";
import { Link } from "react-router-dom";
import AuthorId from "../pages/AuthorId";

function PostItems({
  id,
  title,
  description,
  thumbnail,
  authorId,
  createdAt,
  category,
}) {
  const shortDesc =
    description.length > 150 ? description.substr(0, 145) + "..." : description;
  const shortTitle = title.length > 50 ? title.substr(0, 50) + "..." : title;

  return (
    <div className="bg-white w-[330px] h-[450px] p-4 mx-auto flex flex-col justify-between rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image Container */}
      <Link to={`/post/${id}`}>
        <div className="w-full h-[200px] bg-red-600 mb-4 rounded-sm overflow-hidden">
          <img
            src={`http://localhost:8000/uploads/${thumbnail}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Post Title */}
      <Link to={`/post/${id}`}>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {shortTitle}
          </h2>
        </div>
      </Link>

      {/* Post Description */}
      <Link to={`/post/${id}`}>
        <div className="text-[14px] text-gray-600 mb-2">
          <p dangerouslySetInnerHTML={{__html: shortDesc}}></p>
        </div>
      </Link>

      {/* Footer with Author Info and Category */}
      <div className="flex justify-between items-center w-full">
        <AuthorId authorId={authorId} createdAt={createdAt} />
        <div>
          <Link to={`/post/category/${category}`}>
            <h3 className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
              {category || "Uncategorized"}
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostItems;
