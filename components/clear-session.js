import React from 'react'
import { Button, Header } from 'semantic-ui-react'

const ClearSession = () => {
  const clearSession = () => localStorage.clear()
  
  return (
    <>
      <Header as='h2'>Clear Session</Header>
      <Button color='red' onClick={clearSession}>Claer</Button>
    </>
  )
}

export default ClearSession