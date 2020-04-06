import React, { useCallback, useState } from 'react'
import { Container, Header } from 'semantic-ui-react'
import TipButtons from './tip-buttons'
import ShowPayments from './show-payments'
import SendMoneyTo from './send-money-to'
import PublishRawString from './publish-raw-string'
import PublishFile from './publish-file'
import SignText from './sign-text'
import EncryptAndDecrypt from './encrypt-and-decrypt'
import ClearSession from './clear-session'

const allPayments = []

const styleContainer = {
  marginTop: '20px'
}

const SimpleExample = ({ imb }) => {
  const [payments, setPayments] = useState(allPayments)
  const newPaymentReceived = useCallback(newPayment => {
    allPayments.push(newPayment)
    console.log('allPayments', allPayments)
    setPayments([...allPayments])
  })
  return (
    <div style={styleContainer}>
      <Header as='h1' content='IMB demo app' textAlign='center' />
      <Container style={styleContainer}>
        <ClearSession />
      </Container>
      <Container style={styleContainer}>
        <TipButtons imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container style={styleContainer}>
        <SendMoneyTo imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container style={styleContainer}>
        <PublishRawString imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container style={styleContainer}>
        <PublishFile imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container style={styleContainer}>
        <SignText imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container style={styleContainer}>
        <EncryptAndDecrypt imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container style={styleContainer}>
        <ShowPayments payments={payments} />
      </Container>
    </div>
  )
}

export default SimpleExample