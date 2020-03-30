import React from 'react'
import Head from 'next/head'

const MainLayout = ({ children }) => (
  <div className="container">
    <Head>
      <title>IMB example</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      <script src="https://moneybuttonstaging.com/moneybutton.js"></script>
    </Head>
    {children}
  </div>
)

export default MainLayout