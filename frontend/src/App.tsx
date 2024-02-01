import './App.css'
import { useSelector } from 'react-redux'

function App() {
  const user = useSelector((state:any) => state.user)
  return (
    <>
      <ul>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li></li>
      </ul>
    </>
  )
}

export default App
