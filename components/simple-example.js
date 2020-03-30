import React, { useCallback, useState } from 'react'
import { Container, Header } from 'semantic-ui-react'
import TipButtons from './tip-buttons'
import ShowPayments from './show-payments'

const initialPayments = [
  {
    "createdAt": "2020-03-30T18:58:20.108Z",
    "userId": "5",
    "txid": "f43b900b45f26da7e7fd0773434e76a395f293e6be337979c0d659de4d74a886",
    "normalizedTxid": "e7281d53bbf880c0b3d1a49d6b692287e17390f81622b55448a97621ad6aad49",
    "amount": "0.6447011853982787",
    "currency": "ARS",
    "satoshis": "6064",
    "status": "RECEIVED",
    "statusDescription": null,
    "buttonId": null,
    "buttonData": null,
    "amountUsd": "0.01000006492039328",
    "inputAmountUsd": "0.02376169779649518",
    "inputAmountSatoshis": "14409",
    "spendAmountUsd": "0.0003133265723738",
    "spendAmountSatoshis": "190",
    "feeAmountUsd": "0.0003133265723738",
    "feeAmountSatoshis": "190",
    "changeAmountUsd": "0.0134483063037281",
    "changeAmountSatoshis": "8155",
    "rawtx": "01000000021e4029bbdc89119f742fcbe9327bcf42d58df27dcd17137e64822921b41a1a87000000006b483045022100a3c93d125692f3adec87c505ddf8fed889881b100a1debc400e65aa40f12bd72022059fddfb74976a09611b420166bd3e84aaa3ef9790542d693da55a4f278b0e0cb4121021297fe5f9f76b20544d43abfb5687081541239f9b0e9bcdecdba9d43fe42f4f3ffffffff1e4029bbdc89119f742fcbe9327bcf42d58df27dcd17137e64822921b41a1a87010000006a47304402204cc7a1d6c8f1d3f16575770d6a9c0856a60f9d426a28284321975855c1a95a0f022002be292a80878901e802e5e807a76de62543486ef7b5f009baacc2f77c2125494121021297fe5f9f76b20544d43abfb5687081541239f9b0e9bcdecdba9d43fe42f4f3ffffffff02b0170000000000001976a914ac56f3b0bcd4685dc573f79c73e864c7659e88e088acdb1f0000000000001976a914ac56f3b0bcd4685dc573f79c73e864c7659e88e088ac00000000",
    "senderSignature": "IPGO1waEBF8JkchlinYO6bM3vsXJ4+42eVh/pbnWLE52LOy0QyuX/Fl28nQCCZuTVt2r8T+SiWYDuKrE7ZijAjo=",
    "signaturePubkey": "0216914daf8649fae2f29eb7d52e71c54cee4b418e0b1331da4ffac3dbf8a546a4",
    "senderPaymail": "5@moneybuttonstaging.com",
    "referrerUrl": "http://localhost:3000/",
    "browserUserAgent": null,
    "id": "385",
    "cryptoOperations": [],
    "paymentOutputs": [
      {
        "createdAt": "2020-03-30T18:58:20.114Z",
        "to": "5",
        "amount": "0.01",
        "currency": "USD",
        "satoshis": "6064",
        "type": "USER",
        "userId": "5",
        "address": null,
        "script": null,
        "amountUsd": "0.01",
        "paymailDt": null,
        "paymailPubkey": null,
        "paymailPurpose": null,
        "paymailRecipientHandle": null,
        "paymailSenderHandle": null,
        "paymailSenderName": null,
        "paymailSignature": null,
        "id": "1"
      }
    ]
  }
]

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
        <ShowPayments payments={payments} />
      </Container>
      {/* <ul>
        {payments.map(p => 
          <li key={p.id}>
            <b>txid:</b> <a href={`https://whatsonchain.com/tx/${p.txid}`}>{p.txid}</a> <br />
            <b>mb url:</b> <a href={`https://moneybuttonstaging.com/money/detail/payments/${p.id}`}>https://moneybuttonstaging.com/money/detail/payments/{p.id}</a> <br />
          </li>
        )}
      </ul> */}
    </div>
  )
}

export default SimpleExample