import React from 'react';
import { Divider } from 'primereact/divider';

export default function Footer() {    
    return (
        <footer className="footer-container p-4">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Sistema Médico</h4>
                    <p>Gestión de pacientes y tratamientos.</p>
                </div>
                <Divider layout="vertical" />
                <div className="footer-section">
                    <h4>Enlaces Útiles</h4>
                    <ul className="footer-links">
                        <li><a href="/about">Sobre Nosotros</a></li>
                        <li><a href="/contact">Contacto</a></li>
                        <li><a href="/privacy-policy">Política de Privacidad</a></li>
                    </ul>
                </div>
                <Divider layout="vertical" />
                <div className="footer-section">
                    <h4>Contáctanos</h4>
                    <p>Tel: +52 999 567 8345</p>
                    <p>Email: soporte@medicalsoft.com</p>
                    <p>Dirección: Calle Salud, 123, Ciudad de Mérida</p>
                </div>
            </div>
            <Divider />
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} MedicalSoft. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
