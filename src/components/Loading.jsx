import React from 'react'
import rolling from '../images/mern-blog-assets-main/rolling.gif'

function Loading() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <img src={rolling} alt="" />
    </div>
  )
}

export default Loading
