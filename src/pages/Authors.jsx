import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

function Authors() {

  const [authors, setAuthors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const getAuthors = async()=>{
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:8000/api/user`)
        setAuthors(response.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    getAuthors()
  },[])

  if(isLoading){
    return <Loading />
  }

  return (
    <div className='bg-gray-100 min-h-screen py-10'>
      <h1 className='text-3xl text-center font-semibold mb-8'>
        Meet Our Authors
      </h1>

      <div className='grid gap-6 px-10 md:px-16 lg:px-28 xl:px-40 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        {
          authors.length > 0 ? 
          authors.map((author) => (
            <div
              key={author._id}
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105'
            >
              {/* Avatar Image */}
              <img
                src={`http://localhost:8000/uploads/${author.avatar}`}
                alt={author.name}
                className='w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200'
              />
              
              {/* Author Name */}
              <h2 className='text-xl font-medium text-center'>
                {author.name}
              </h2>

              {/* Post Count */}
              <Link to={`/posts/users/${author._id}`} className='flex justify-center text-gray-600 hover:text-blue-500 hover:underline'>
                {author.posts} {author.posts === 1 ? "Post" : "Posts"}
              </Link>
            </div>
          )) : 
          <h1 className='text-2xl text-center font-semibold col-span-full'>
            No User/Author found
          </h1>
        }
      </div>
    </div>
  );
}

export default Authors;
