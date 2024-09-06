import React from 'react'
import Home from "@/Component/Home/home"
import Head from 'next/head'


const index = () => {
  

  
  
  return (
    <>
     <Head>
          <title>The Grow Food</title>
          <meta name="description" content="The Grow Food Is B2B solution for Restaurants" />
          <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
        </Head>
      <div className='bg-gray-100 w-full'>
          <Home/>
          
      </div>
      
    </>
  )
}

export default index;