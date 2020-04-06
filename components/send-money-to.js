import React, { useState } from 'react'
import { Button, Header, Input } from 'semantic-ui-react'

const SendMoneyTo = ({ imb, onPayment }) => {
  const [to, setTo] = useState('5@moneybuttonstaging.com')
  const pay = async () => {
    const { payment } = await imb.swipe({
      outputs: [
        {
          to,
          currency: 'USD',
          amount: '0.01'
        }
      ]
    })
    onPayment(payment)
  }
  
  return (
    <>
      <Header as='h2'>Select the receiver and send one entire cent:</Header>
      <Input value={to} onChange={(e) => setTo(e.target.value)} action={{
        color: 'teal',
        content: 'send 1 cent',
        onClick: pay
      }} />
    </>
  )
}

export default SendMoneyTo