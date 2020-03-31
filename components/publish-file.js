import React, { useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import cn from 'classnames'
import _ from 'lodash'
import bsv from 'bsv'

const CHUNK_SIZE_BYTES = 99 * 1000

const PublishFile = ({ imb, onPayment }) => {
  const [hover, setHover] = useState(false)

  const onFile = (files) => {
    setHover(false)
    const file = files[0]
    const reader = new FileReader()
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result
      // console.log(Buffer.from(e.target.result.slice(0 * 100 * 1000, 1 * 100 * 1000)).toString('hex'))
      // console.log(Buffer.from(e.target.result.slice(1 * 100 * 1000, 2 * 100 * 1000)).toString('hex'))
      // console.log(Buffer.from(e.target.result.slice(2 * 100 * 1000, 3 * 100 * 1000)).toString('hex'))
      // console.log(Buffer.from(e.target.result.slice(3 * 100 * 1000, 4 * 100 * 1000)).toString('hex'))
      // console.log(Buffer.from(e.target.result.slice(4 * 100 * 1000, 5 * 100 * 1000)).toString('hex'))
      const numberOfchunks = Math.ceil(arrayBuffer.byteLength / (CHUNK_SIZE_BYTES))
      const chunks = _.range(numberOfchunks).map(n => 
        Buffer.from(e.target.result.slice(n * CHUNK_SIZE_BYTES, (n + 1) * CHUNK_SIZE_BYTES))
      )
      const payments = [] 
      for (let chunk of chunks) {
        const payment = await imb.swipe({
          outputs: [
            {
              script: bsv.Script.buildSafeDataOut(['1ChDHzdd1H4wSjgGMHyndZm6qxEDGjqpJL', chunk]).toASM(),
              amount: '0',
              currency: 'BSV'
            }
          ]
        })
        payments.push(payment)
      }
      const finalPayment = await imb.swipe({
        outputs: [{
          script: bsv.Script.buildSafeDataOut([
            Buffer.from('15DHFxWZJT58f9nhyGnsRBqrgwK4W6h4Up'), 
            Buffer.from('test'),
            Buffer.from('image/png'),
            Buffer.from('\0'),
            Buffer.from('imagencita.png'),
            Buffer.from('\0'),
            ...payments.map(p => Buffer.from(payment.txid, 'hex'))
          ]).toASM(),
          amount: '0',
          currency: 'BSV'
        }]
      })
    }
    reader.readAsArrayBuffer(file)
  }

  const coso = async () => {
    const payment = await imb.swipe({
      outputs: [{
        script: bsv.Script.buildSafeDataOut([
          Buffer.from('15DHFxWZJT58f9nhyGnsRBqrgwK4W6h4Up'), 
          Buffer.from('test'),
          Buffer.from('image/png'),
          Buffer.from('\0'),
          Buffer.from('imagencita.png'),
          Buffer.from('\0'),
          Buffer.from('5714dc4fb2b1e18573aa000bd1ec220d781462cd1ec361cc8858870e34d31bf3', 'hex'),
          Buffer.from('f1f0cee97c6a0d2f8a90064c6b6a6d8a106d15265c1358b6a72d186194209034', 'hex'),
          Buffer.from('6ded4f1d554fc9b4590807f06b1173fd41952bd2c90465d20bcb0a0f9fbd3d80', 'hex'),
          Buffer.from('d015d21e9c11d4afa4cf677d47b0b9efd049f59f53d5b7b31da2d3ac43bc90be', 'hex'),
          Buffer.from('1c16ead9548c42a8668d680336926700fb23fbce2d32e1b42c554ea746759866', 'hex')
        ]).toASM(),
        amount: '0',
        currency: 'BSV'
      }]
    })
    console.log('a ver...', payment.txid)
  }
  return (
    <>
      <Header as='h2'>Upload file to the blockchain using b-cat:</Header>
      <Dropzone onDrop={onFile}>
        {({ getRootProps, getInputProps }) => (
          <section className={cn('wrapper', { hovered: hover })}>
            <div 
              className={cn('drop-zone', { hovered: hover })} 
              {...getRootProps()} 
              onDragEnter={() => setHover(true)}
              onDragLeave={() => setHover(false)}
            >
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <Button content='coso' onClick={coso} />
      <style jsx>{`
        .wrapper {
          padding: 5px;
          width: 400px;
        }
        .wrapper.hovered {
          background-color: #77dd77;
        }

        .drop-zone {
          border: dashed grey 3px;
          height: 200px;
          display flex;
          align-items: center;
          justify-content: center;
        }

        .drop-zone.hovered {
        }
      `}</style>
    </>
  )
}

export default PublishFile