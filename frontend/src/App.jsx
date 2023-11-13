
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Reports from './components/Reports'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'

function App() {


  return (
    <>
    
      <Routes>
        <Route path='/' element= {<Reports/>}/>
        <Route path='/signup' element= {<Signup/>}/>
        <Route path='/signin' element= {<SignIn/>}/>
      </Routes>
    </>
  )
}

export default App
