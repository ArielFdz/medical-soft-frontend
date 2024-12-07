import './App.css';
import { Directory } from './pages/Directory';
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Footer from './components/Footer';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { AboutUs } from './pages/AboutUs';
import AppMenu from './components/AppMenu';
import { LoginDoctor } from './pages/LoginDoctor';
import { Patients } from './pages/Patients';
import { DashBoardPatients } from './pages/DashboradPatients';
import { Files } from './pages/Files';
import MyCalendar from './components/MyCalendar';
import { MyPatients } from './pages/MyPatients';
import { useDataPatientsStore } from './store/useDataPatientsStore';
import { useDataDoctoresStore } from './store/useDataDoctoresStore';
import { Logout } from './components/Logout';
import { Treatments } from './pages/Treatments';

function App() {
  const { userData: userDataDoctores } = useDataDoctoresStore();
  const { userData: userDataPacientes } = useDataPatientsStore();

  return (
    <div className="app-container">
      <Router>
        <AppMenu />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Rutas de doctores */}
            {userDataDoctores && (
              <>
                <Route path="/patients" element={<Patients />} />
                <Route path="/evidencias/:id" element={<Files />} />
                <Route path="/treatments/:id" element={<Treatments />} />
                <Route path="/appointments" element={<MyCalendar />} />
                <Route path="/mypatients" element={<MyPatients />} />
              </>
            )}

            {/* Rutas de pacientes */}
            {userDataPacientes && (
              <>
                <Route path="/myinfo" element={<DashBoardPatients />} />
              </>
            )}

            {/* Rutas para usuarios no autenticados */}
            {!userDataDoctores && !userDataPacientes && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/login-doctor" element={<LoginDoctor />} />
                <Route path="/register" element={<Register />} />
              </>
            )}

            {/* Rutas comunes */}
            <Route path="/directory" element={<Directory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path='/logout' element={<Logout />} />
            {/* Redirección por defecto */}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
