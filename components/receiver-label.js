import React from 'react'
import { Label } from 'semantic-ui-react'

const ReceiverLabel = ({ output }) => {
  let label = null
  if (output.paymailRecipientHandle) {
    label = output.paymailRecipientHandle
  } else if (output.address) {
    label = output.address.substring(0, 5) + '...'
  } else {
    label = 'unknown'
  }
  return (
    <Label as='a' image>
      <img src='https://www.moneybutton.com/static/img/icons/user-placeholder.png' />
      {label}
    </Label>
  )
}

export default ReceiverLabel