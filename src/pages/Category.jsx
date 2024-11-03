import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams } from 'react-router-dom'
import PostItems from '../components/PostItems'

function Category() {
  const {category} = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const fetchPosts = async()=>{
      setIsLoading(true)
      try {
        const response = await axios.get(`http://localhost:8000/api/post/categories/${category}`)
        
        setPosts(response?.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchPosts()
  },[category])

  if(isLoading){
    return <Loading/>
  }

  return (
    <div className="bg-gray-300 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {posts.length > 0 ? (
          posts.map(({_id: id, title, category, description, thumbnail, creator, createdAt}) => (
            <PostItems
              key={id}
              id={id}
              title={title}
              description={description}
              category= {category}
              thumbnail={thumbnail}
              authorId={creator}
              createdAt={createdAt}
            />
          ))
        ) : (
          <p className="col-span-full text-center">No posts available. Create a new post!</p>
        )}
      </div>
    </div>
  );
}

export default Category
