import React from 'react'
import CreateBrand from '../../Component/Admin/createBrand'
import Head from 'next/head'

const brands = () => {
  return (
    <>
    <Head>
          <title>The Grow Food</title>
          <meta name="description" content="The Grow Food Is B2B solution for Restaurants" />
          <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
        </Head>
    <div>
        <CreateBrand/>
    </div>
    </>
  )
}

export default brands