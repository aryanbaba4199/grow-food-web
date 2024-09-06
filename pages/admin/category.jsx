import React from 'react'
import CreateCategory from '../../Component/Admin/createCategory/createCategory';
import Head from 'next/head';
const category = () => {
  return (
    <>
     <Head>
          <title>The Grow Food</title>
          <meta name="description" content="The Grow Food Is B2B solution for Restaurants" />
          <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
        </Head>
   
    <div>
        <CreateCategory/>
    </div>
    </>
  )
}

export default category;