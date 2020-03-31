import React, { useCallback, useState } from 'react'
import { Container, Header } from 'semantic-ui-react'
import TipButtons from './tip-buttons'
import ShowPayments from './show-payments'
import SendMoneyTo from './send-money-to'
import PublishRawString from './publish-raw-string'
import PublishFile from './publish-file'

const initialPayments = []

const SimpleExample = ({ imb }) => {
  const [payments, setPayments] = useState(initialPayments)
  const newPaymentReceived = useCallback(newPayment => {
    setPayments([...payments, newPayment])
  })
  return (
    <div>
      <Header as='h1' content='IMB demo app' textAlign='center' />
      <Container>
        <TipButtons imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container>
        <SendMoneyTo imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container>
        <PublishRawString imb={imb} onPayment={newPaymentReceived} />
      </Container>
      <Container>
        <PublishFile imb={imb} />
      </Container>
      <Container>
        <ShowPayments payments={payments} onPayment={newPaymentReceived} />
      </Container>
    </div>
  )
}

export default SimpleExample