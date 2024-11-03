import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from "react-icons/fi";

export default function ErrorPage() {
  return (
    <div className='h-[100vh] flex justify-center items-center flex-col'>
      <h1 className='text-8xl font-semibold mb-12'>404</h1>
      <h1 className='text-3xl mb-9'>Page Not Found</h1>
      <button className='bg-slate-600 text-white px-3 py-2'>
        <Link className='flex justify-center items-center gap-1' to='/'><FiArrowLeft/>Go Back</Link>
      </button>
    </div>
  )
}
