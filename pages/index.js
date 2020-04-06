import MainLayout from '../components/layouts/main'
import { useEffect, useState } from 'react'
import SimpleExample from '../components/simple-example'

const Home = () => {
  const [imb, setImb] = useState(null)
  useEffect(() => {
    setImb(new moneyButton.IMB({
      clientIdentifier: process.env.clientIdentifier,
      onNewPermissionGranted: (permissionCode) => localStorage.setItem('auth-token', permissionCode),
      permission: localStorage.getItem('auth-token')
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
