import React, { useState } from 'react'
import { Button, Header, Input, TextArea } from 'semantic-ui-react'

const PublishRawString = ({ imb, onPayment }) => {
  const [data, setData] = useState('')
  const send = async (e) => {
    e.preventDefault()
    const payment = await imb.swipe({
      outputs: [
        {
          script: `OP_FALSE OP_RETURN ${Buffer.from(data).toString('hex')}`,
          currency: 'USD',
          amount: '0.01'
        }
      ]
    })
    onPayment(payment)
  }
  
  return (
    <>
      <Header as='h2'>Publish some data to the blockchain:</Header>
      <form>
        <div>
          <TextArea value={data} onChange={(e) => setData(e.target.value)} />
        </div>
        <Button color='teal' content='send 1 cent' onClick={send} />
      </form>
    </>
  )
}

export default PublishRawString