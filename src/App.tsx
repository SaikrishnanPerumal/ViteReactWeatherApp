import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashBoard from './Pages/DashBoard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path='/dashboard' element={<DashBoard />}/>
          <Route path='/' element={<h3>This route is not defined</h3>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
