import MainLayout from '../components/layouts/main'
import { useEffect, useState } from 'react'
import SimpleExample from '../components/simple-example'

const Home = () => {
  const [imb, setImb] = useState(null)
  useEffect(() => {
    console.log(process.env.clientIdentifier)
    setImb(new moneyButton.IMB({
      clientIdentifier: process.env.clientIdentifier
    }))
  }, [])
  return (
    <MainLayout>
      { imb && 
        <SimpleExample imb={imb} />
      }
    </MainLayout>
  )
}
export default Home
