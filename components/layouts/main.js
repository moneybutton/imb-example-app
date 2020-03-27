import React from 'react'
import Head from 'next/head'

const MainLayout = ({ children }) => (
  <div className="container">
    <Head>
      <title>IMB example</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://moneybuttonstaging.com/moneybutton.js"></script>
    </Head>
    {children}
  </div>
)

export default MainLayout