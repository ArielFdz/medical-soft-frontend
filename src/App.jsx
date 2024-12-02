import './App.css'
import { Directory } from './pages/Directory';
import { HomePage } from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Footer from './components/Footer';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AboutUs } from './pages/AboutUs';
import AppMenu from './components/AppMenu';
import { LoginDoctor } from './pages/LoginDoctor';

function App() {
  return (
    <>
    <div className="app-container">
      <Router>
      <AppMenu />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-doctor" element={<LoginDoctor />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
    </>
  )
}

export default App
