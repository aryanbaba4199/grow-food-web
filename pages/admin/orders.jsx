import React from 'react'
import Orders from '../../Component/Admin/Orders/orders';
import Head from 'next/head';

const orders = () => {
  return (
    <>
    <Head>
    <title>The Grow Food</title>
    <meta name="description" content="The Grow Food Is B2B solution for Restaurants" />
    <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
  </Head>
    <div>
        <Orders/>
    </div>
    </>
  )
}

export default orders;