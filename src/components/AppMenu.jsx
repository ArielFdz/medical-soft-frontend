import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png'
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { useDataPatientsStore } from '../store/useDataPatientsStore';

const AppMenu = () => {
    const navigate = useNavigate();
    const { userData: userDataDoctores } = useDataDoctoresStore();
    const { userData: userDataPacientes } = useDataPatientsStore();

    let menuItems = [];

    if (userDataDoctores) {
        menuItems = [
            ...menuItems,
            { label: 'Mis Pacientes', icon: 'pi pi-user', command: () => navigate('/mypatients') },
            { label: 'Mis Citas', icon: 'pi pi-calendar', command: () => navigate('/appointments') },
            { label: 'Pacientes de la clinica', icon: 'pi pi-user', command: () => navigate('/patients') },
        ];
    }

    if (userDataPacientes) {
        menuItems = [
            ...menuItems,
            { label: 'Mis Citas', icon: 'pi pi-calendar', command: () => navigate('/myappointments') },
        ];
    }

    if (!userDataDoctores && !userDataPacientes) {
        menuItems = [
            ...menuItems,
            {
                label: 'Acceso',
                icon: 'pi pi-sign-in',
                items: [
                    { label: 'Pacientes', icon: 'pi pi-user', command: () => navigate('/login') },
                    { label: 'Doctores', icon: 'pi pi-user', command: () => navigate('/login-doctor') },
                ],
            },
        ];
    }

    menuItems = [
        ...menuItems,
        { label: 'Directorio', icon: 'pi pi-users', command: () => navigate('/directory') },
        { label: 'Contacto', icon: 'pi pi-envelope', command: () => navigate('/contact') },
    ];

    if(userDataDoctores || userDataPacientes)
    {
        menuItems = [
            ...menuItems,
            { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => navigate('/logout') },,
        ];
    }

    const logo = (
        <img
            src={Logo}
            alt="Logo de la Empresa"
            style={{ height: '40px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
        />
    );

    return (
        <Menubar model={menuItems} start={logo} />
    );
};

export default AppMenu;
