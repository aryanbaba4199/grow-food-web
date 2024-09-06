import React from 'react'
import Products from '@/Component/Admin/products/products';
import Head from 'next/head';

const products = () => {
  
  return (
    <>
    <Head>
    <title>The Grow Food</title>
    <meta name="description" content="The Grow Food Is B2B solution for Restaurants" />
    <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
  </Head>
    <div>
        <Products/>
    </div>
    </>
  )
}

export default products;