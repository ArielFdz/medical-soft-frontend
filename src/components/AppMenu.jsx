import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'

const AppMenu = () => {
    const navigate = useNavigate();

    // Define las rutas de navegación
    const menuItems = [
        { label: 'Acceso', icon: 'pi pi-sign-in', command: () => navigate('/login') },
        { label: 'Directorio', icon: 'pi pi-users', command: () => navigate('/directorio') },
        { label: 'Contacto', icon: 'pi pi-envelope', command: () => navigate('/contact') },
    ];

    const logo = (
        <img
            src={Logo} // Reemplaza con la ruta de tu logo
            alt="Logo de la Empresa"
            style={{ height: '40px', cursor: 'pointer' }}
            onClick={() => navigate('/')} // Navega a la página de inicio al hacer clic
        />
    );

    return (
        <Menubar model={menuItems} start={logo} />
    );
};

export default AppMenu;
