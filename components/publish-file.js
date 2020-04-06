import React, { useState } from 'react'
import { Header, Button } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import cn from 'classnames'
import _ from 'lodash'
import bsv from 'bsv'

const CHUNK_SIZE_BYTES = 99 * 1000

const PublishFile = ({ imb, onPayment }) => {
  const [hover, setHover] = useState(false)
  const [fileReceived, setFileReceived] = useState(false)
  const [uploadStarted, setUploadStarted] = useState(false)
  const [fileToUpload, setFileToUpload] = useState(null)
  const [processedChunks, setProcessedChunks] = useState(0)
  const [bcatPayment, setBcatPayment] = useState(null)

  const onFile = (files) => {
    setHover(false)
    setFileReceived(true)
    const file = files[0]
    const reader = new FileReader()
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result
      const numberOfchunks = Math.ceil(arrayBuffer.byteLength / (CHUNK_SIZE_BYTES))
      const chunks = _.range(numberOfchunks).map(n => 
        Buffer.from(e.target.result.slice(n * CHUNK_SIZE_BYTES, (n + 1) * CHUNK_SIZE_BYTES))
      )
      setFileToUpload({ chunks, mime: file.type})
    }
    reader.readAsArrayBuffer(file)
  }
  const doUpload = async () => {
    const payments = []
    setUploadStarted(true)
    for (let chunk of fileToUpload.chunks) {
      const { payment } = await imb.swipe({
        outputs: [
          {
            script: bsv.Script.buildSafeDataOut(['1ChDHzdd1H4wSjgGMHyndZm6qxEDGjqpJL', chunk]).toASM(),
            amount: '0',
            currency: 'BSV'
          }
        ]
      })
      payments.push(payment)
      onPayment(payment)
      setProcessedChunks(payments.length)
    }
    const { payment: finalPayment } = await imb.swipe({
      outputs: [{
        script: bsv.Script.buildSafeDataOut([
          Buffer.from('15DHFxWZJT58f9nhyGnsRBqrgwK4W6h4Up'), 
          Buffer.from('test'),
          Buffer.from(fileToUpload.mime),
          Buffer.from('\0'),
          Buffer.from('imagencita.png'),
          Buffer.from('\0'),
          ...payments.map(payment => Buffer.from(payment.txid, 'hex'))
        ]).toASM(),
        amount: '0',
        currency: 'BSV'
      }]
    })
    onPayment(finalPayment)
    setUploadStarted(false)
    setBcatPayment(finalPayment)
    setFileToUpload(null)
  }

  const cancel = () => {
    setFileReceived(false)
    setFileToUpload(null)
  }

  return (
    <>
      <Header as='h2'>Upload file to the blockchain using b-cat:</Header>
      
      {!fileReceived &&
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
      }
      {fileReceived &&
        <div className='wrapper'>
          <div className='file-status'>
            {fileToUpload !== null && uploadStarted &&
              <span>{processedChunks}/{fileToUpload.chunks.length}</span>
            }
            {fileToUpload !== null && !uploadStarted &&
              <span>Clink "upload" to start</span>
            }
          </div>
        </div>
      }
      <Button content='upload' color='teal' disabled={fileToUpload === null} onClick={doUpload} />
      <Button content='cancel' disabled={!fileReceived} onClick={cancel} />
      <Button 
        content='See it on bico.media' 
        disabled={bcatPayment === null} 
        color='teal' 
        icon='right arrow' 
        labelPosition='right'
        as='a'
        href={`https://bico.media/${bcatPayment !== null ? bcatPayment.txid : ''}`}
        rel='noopener noreferrer' target='_blank' 
      />
      <style jsx>{`
        .wrapper {
          padding: 5px;
          width: 400px;
        }
        .wrapper.hovered {
          background-color: #77dd77;
        }

        .drop-zone, .file-status {
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