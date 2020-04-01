import React from 'react'
import { Button, Header } from 'semantic-ui-react'

const TipButtons = ({ imb, onPayment }) => {
  const makeTip = async (amount) => {
    try {
      const payment = await imb.swipe({
        outputs: [
          {
            to: '5@moneybuttonstaging.com',
            currency: 'USD',
            amount
          }
        ]
      })
      onPayment(payment)
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
    <>
      <Header as='h2'>Tip buttons</Header>
      <Button color='teal' onClick={() => makeTip('0.01')}>Tip 1 cent</Button>
      <Button color='teal' onClick={() => makeTip('0.02')}>Tip 2 cents</Button>
      <Button color='teal' onClick={() => makeTip('0.03')}>Tip 3 cents</Button>
      <Button color='teal' onClick={() => makeTip('0.05')}>Tip 5 cents</Button>
      <Button color='teal' onClick={() => makeTip('0.10')}>Tip 10 cents</Button>
    </>
  )
}

export default TipButtons