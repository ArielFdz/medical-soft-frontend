import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalPatient from '../components/ModalPatient';
import { getPatients } from '../services/patientService'; 

import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { asignPatientToDoctor } from '../services/patient-doctor';
import { Toast } from 'primereact/toast';

export const Patients = () => {
    const [visible, setVisible] = useState(false);
    const [patients, setPatients] = useState([]);
    const { userData } = useDataDoctoresStore(); 
    const toast = React.useRef(null);

    const assignButtonTemplate = (rowData) => {
        return (
            <Button 
                label="Asignar" 
                icon="pi pi-check" 
                onClick={() => handleSubmit(rowData.id)}
            />
        );
    };

    const handleSubmit = async (id) => {
        const patientData = { idPatient: id };
        try {
            await asignPatientToDoctor(patientData, userData.jwt);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Asignación exitosa.' });
        } catch (error) {
            console.log('Error al enviar los datos:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${error.message}` });
        }
    };

    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchPatients = async () => {
                try {
                    const data = await getPatients(userData.jwt);
                    setPatients(data.patientsRecord);
                    
                    console.log(data);// Guardar los pacientes en el estado
                } catch (error) {
                    console.error('Error al obtener los pacientes:', error);
                }
            };
            fetchPatients();
        }
    }, [userData, visible]);

    return (
        <>
            <h1>Pacientes</h1>
            <Toast ref={toast} />
            <Button label="Agregar paciente" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            
            <DataTable value={patients} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className='mt-5'>
                <Column field="name" header="Nombre" sortable />
                <Column field="email" header="Correo Electrónico" sortable />
                <Column field="dateOfBirth" header="Fecha de Nacimiento" />
                <Column header="Acción" body={assignButtonTemplate} />
            </DataTable>

            <ModalPatient visible={visible} setVisible={setVisible} />
        </>
    );
};
