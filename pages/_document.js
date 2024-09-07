// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>The Grow Food | B2B Solutions for Restaurants</title>
      <Head>
        {/* Primary Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="The Grow Food is a B2B solution for Restaurants, offering high-quality food products and services to streamline operations and enhance customer satisfaction."
        />
        <meta
          name="keywords"
          content="B2B, Restaurants, Hotels, Food suppliers, Food services, Hospitality"
        />
        <meta
          name="author"
          content="Raushan Kumar"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="The Grow Food | B2B Solutions for Restaurants" />
        <meta
          property="og:description"
          content="The Grow Food provides quality food products and services for restaurants and hotels. Streamline your food procurement with us."
        />
        <meta property="og:url" content="https://thegrowfood.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://thegrowfood.com/your-image-url.jpg"  // Replace with your actual image URL
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Grow Food | B2B Solutions for Restaurants" />
        <meta
          name="twitter:description"
          content="The Grow Food provides quality food products and services for restaurants and hotels. Streamline your food procurement with us."
        />
        <meta
          name="twitter:image"
          content="https://thegrowfood.com/your-image-url.jpg" // Replace with your actual image URL
        />

        {/* Additional Meta Tags */}
        <meta name="google-site-verification" content="QRWuEWi5G1bkai661nFAdPTkv12k9qGHiTynehQ-vmA" />
        <link rel="canonical" href="https://thegrowfood.com/" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
