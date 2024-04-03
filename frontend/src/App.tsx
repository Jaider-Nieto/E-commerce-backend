import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home.view'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={Home()}></Route>
      </Routes>
    </>
  )
}

export default App
