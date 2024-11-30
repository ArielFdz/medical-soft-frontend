import './App.css'
import { Directory } from './pages/Directory';
import { HomePage } from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/directorio" element={<Directory />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
