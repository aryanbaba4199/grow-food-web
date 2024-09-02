// pages/_app.js
/* eslint-disable */
import "@/styles/globals.css";
import 'react-multi-carousel/lib/styles.css'
import Header from "@/Component/Header/header";
import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { UserProvider } from "@/userContext";
import Store from "@/Redux/store";
import SidebarMenu from "@/Component/Header/SidebarMenu";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      
      <Head>
      <title>Grow Food</title> 
        <meta name="description" content="Grow Food - Service In Your Restaurants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ReduxProvider store={Store}>
        <UserProvider>
          <Header setCollapse={setCollapse} collapse={collapse} />
          <main className="flex ">
            <div className="md:block hidden">
            <SidebarMenu collapse = {collapse} />
            </div>
            <div className="h-[90vh] w-full overflow-scroll">
            <Component {...pageProps} />
            </div>
          </main>
          
        </UserProvider>
      </ReduxProvider>
    </>
  );
}
