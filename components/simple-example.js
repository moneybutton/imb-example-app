import React, { useCallback, useState } from 'react'

const SimpleExample = ({ imb }) => {
  const [payments, setPayments] = useState([])
  const makeTip = useCallback(() => {
    console.log('asdadsa')
    imb.swipe({
      outputs: [
        {
          to: '5',
          amount: '0.01',
          currency: 'USD'
        }
      ]
    }).then(p =>{
      console.log('-------->')
      setPayments([...payments, p])
    })
  }, [imb, payments])

  const requestPermission = useCallback(() => {
    imb.askForPermission()
  })
  return (
    <div>
      <h1>Try the following ones:</h1>
      <div>
        <button onClick={requestPermission}>Authorize</button>
      </div>
      <div>
        <button onClick={makeTip}>Tip!</button>
      </div>
      {console.log('payments', payments)}
      <ul>
        {payments.map(p => 
          <li key={p.id}>
            <b>txid:</b> <a href={`https://whatsonchain.com/tx/${p.txid}`}>{p.txid}</a> <br />
            <b>mb url:</b> <a href={`https://moneybuttonstaging.com/money/detail/payments/${p.id}`}>https://moneybuttonstaging.com/money/detail/payments/{p.id}</a> <br />
          </li>
        )}
      </ul>
    </div>
  )
}

export default SimpleExample