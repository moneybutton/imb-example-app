import React from 'react'
import { Card, Button, Icon, Label } from 'semantic-ui-react'
import ReceiverLabel from './receiver-label'

const metaStyle = {
  textOverflow: 'ellipsis',
  width: '100%',
  overflow: 'hidden'
}

const ShowPayments = ({ payments }) => {
  return (
    <div>
      <Card.Group>
        {payments.map((payment, i) => 
          <Card key={payment.id}>
            <Card.Content>
        <Card.Header>Payment {i}</Card.Header>
              <Card.Meta style={metaStyle}>{payment.txid}</Card.Meta>
              <Card.Description>
                {payment.paymentOutputs.map(output => <ReceiverLabel output={output} /> )}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button as='a' rel='noopener noreferrer' target='_blank' href={`https://whatsonchain.com/tx/${payment.txid}`} basic color='yellow' icon>
                  <Icon name='search' />
                </Button>
                <Button as='a' rel='noopener noreferrer' target='_blank' href={`https://moneybuttonstaging.com/money/detail/payments/${payment.id}`} basic color='blue' icon>
                  <Icon name='wordpress forms' />
                </Button>
              </div>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    </div>
  )
}

export default ShowPayments