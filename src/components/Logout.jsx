import React, { useEffect } from 'react'
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { useDataPatientsStore } from '../store/useDataPatientsStore';

export const Logout = () => {

    const { userData: userDataDoctores, clearUserData: clearDoctor } = useDataDoctoresStore();
    const { userData: userDataPacientes, clearUserData: clearPaciente} = useDataPatientsStore();

    useEffect(() => {
        clearDoctor();
        clearPaciente();
    }, [])
    
    return;
}
