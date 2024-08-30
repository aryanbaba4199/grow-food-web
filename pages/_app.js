// pages/_app.js
/* eslint-disable */
import "@/styles/globals.css";
import Header from "@/Component/Header/header";

import { Provider as ReduxProvider } from "react-redux";
import { UserProvider } from "@/userContext";
import Store from "@/Redux/store";


export default function App({ Component, pageProps }) {
  
  return (
    <>
      <ReduxProvider store={Store}>
        <UserProvider>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          
        </UserProvider>
      </ReduxProvider>
    </>
  );
}
