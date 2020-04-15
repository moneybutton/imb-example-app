import React, { useState } from 'react'
import { Header, Input } from 'semantic-ui-react'
import bsv from 'bsv'

const SignText = ({ imb, onPayment }) => {
  const [text, setText] = useState('hello')
  const [signature, setSignature] = useState('')
  const sign = async () => {
    const { payment } = await imb.swipe({
      outputs: [
        {
          to: '5@moneybuttonstaging.com',
          currency: 'USD',
          amount: '0.01'
        },
        {
          script: bsv.Script.buildSafeDataOut([text, '#{signedText}']).toASM(),
          amount: '0',
          currency: 'USD'
        }
      ],
      cryptoOperations: [
        {
          name: 'signedText',
          method: 'sign',
          data: text,
          dataEncoding: 'utf8'
        }
      ]
    })
    onPayment(payment)
    const crOp = payment.cryptoOperations.find(co => co.name === 'signedText')
    setSignature(crOp.value)
  }
  
  return (
    <>
      <Header as='h2'>Select the receiver and send one entire cent:</Header>
      <Input
        action={{
          color: 'teal',
          labelPosition: 'left',
          icon: 'pencil',
          content: 'Sign',
          onClick: sign
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Search...'
      />
      <Input
        value={signature}
        disabled={true} 
      />
    </>
  )
}

export default SignText
