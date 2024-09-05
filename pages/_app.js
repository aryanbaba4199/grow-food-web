// pages/_app.js
import "@/styles/globals.css";
import 'react-multi-carousel/lib/styles.css';
import Header from "@/Component/Header/header";
import { useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { UserProvider } from "@/userContext";
import Store from "@/Redux/store";
import SidebarMenu from "@/Component/Header/SidebarMenu";
import Head from "next/head";


function App({ Component, pageProps }) {
  const [collapse, setCollapse] = useState(false);
  return (
    <ReduxProvider store={Store}>
      <UserProvider>
        <Head>
          <title>Grow Food</title>
          <meta name="description" content="Grow Food - Service In Your Restaurants" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header setCollapse={setCollapse} collapse={collapse} />
        <main className="flex">
          <div
            className="md:block hidden h-[90vh] scrollbar"
            style={{
              scrollbarColor: 'inherit',
              scrollbarWidth: '3px',
            }}
          >
            <SidebarMenu collapse={collapse} />
          </div>
          <div className="md:h-[90vh] md:w-full w-screen md:overflow-scroll">
            <Component {...pageProps} />
          </div>
        </main>
      </UserProvider>
    </ReduxProvider>
  );
}

export default App;
