import React, { useState } from 'react'
import { Header, Input } from 'semantic-ui-react'
import bsv from 'bsv'

const EncryptAndDecrypt = ({ imb, onPayment }) => {
  const [rawText, setRawText] = useState('hello')
  const [encripted, setEncripted] = useState('')
  const encrypt = async () => {
    const { payment } = await imb.swipe({
      outputs: [
        {
          to: '5@moneybuttonstaging.com',
          currency: 'USD',
          amount: '0.01'
        },
        {
          script: bsv.Script.buildSafeDataOut([rawText, '#{sigedText}']).toASM(),
          amount: '0',
          currency: 'USD'
        }
      ],
      cryptoOperations: [
        {
          name: 'encryptedText',
          method: 'encrypt',
          data: rawText,
          dataEncoding: 'utf8'
        }
      ]
    })
    onPayment(payment)
    const crOp = payment.cryptoOperations.find(co => co.name === 'encryptedText')
    setEncripted(crOp.value)
  }

  const decrypt = async () => {
    const { payment } = await imb.swipe({
      outputs: [
        {
          to: '5@moneybuttonstaging.com',
          currency: 'USD',
          amount: '0.01'
        },
        {
          script: bsv.Script.buildSafeDataOut([Buffer.from(encripted), '#{decryptedText}']).toASM(),
          amount: '0',
          currency: 'USD'
        }
      ],
      cryptoOperations: [
        {
          name: 'decryptedText',
          method: 'decrypt',
          data: encripted,
          dataEncoding: 'hex'
        }
      ]
    })
    onPayment(payment)
    const crOp = payment.cryptoOperations.find(co => co.name === 'decryptedText')
    setRawText(crOp.value)
  }
  
  return (
    <>
      <Header as='h2'>Select the receiver and send one entire cent:</Header>
      <Input
        action={{
          color: 'teal',
          labelPosition: 'left',
          icon: 'lock',
          content: 'Encrypt',
          onClick: encrypt
        }}
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        placeholder='Search...'
      />
      <br />
      <br />
      <Input
        action={{
          color: 'teal',
          labelPosition: 'left',
          icon: 'unlock',
          content: 'Decrypt',
          onClick: decrypt
        }}
        value={encripted}
        onChange={(e) => setRawText(e.target.value)}
        placeholder='Search...'
      />
    </>
  )
}

export default EncryptAndDecrypt