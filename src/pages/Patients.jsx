import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalPatient from '../components/ModalPatient';
import { getPatients } from '../services/patientService'; 
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { asignPatientToDoctor } from '../services/patient-doctor';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext'; // Importa el InputText para el buscador
import { Dialog } from 'primereact/dialog'; // Importar Dialog para la ventana de confirmación

export const Patients = () => {
    const [visible, setVisible] = useState(false);
    const [patients, setPatients] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(''); // Estado para el filtro global
    const [confirmationVisible, setConfirmationVisible] = useState(false); // Estado para la ventana de confirmación
    const [patientToAssign, setPatientToAssign] = useState(null); // Estado para almacenar el paciente seleccionado
    const { userData } = useDataDoctoresStore(); 
    const toast = React.useRef(null);

    const assignButtonTemplate = (rowData) => {
        return (
            <Button 
                label="Asignar" 
                icon="pi pi-check" 
                onClick={() => handleAssignClick(rowData)}
            />
        );
    };

    // Manejador para abrir la ventana de confirmación
    const handleAssignClick = (rowData) => {
        setPatientToAssign(rowData); // Guarda el paciente que se va a asignar
        setConfirmationVisible(true); // Muestra el modal de confirmación
    };

    // Manejador para realizar la asignación cuando el usuario confirma
    const handleConfirmAssign = async () => {
        if (patientToAssign) {
            const patientData = { idPatient: patientToAssign.id };
            try {
                await asignPatientToDoctor(patientData, userData.jwt);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Asignación exitosa.' });
            } catch (error) {
                console.log('Error al enviar los datos:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: `${error.message}` });
            }
        }
        setConfirmationVisible(false); // Cierra el modal de confirmación
    };

    // Cerrar la ventana de confirmación sin hacer nada
    const handleCancelAssign = () => {
        setConfirmationVisible(false);
        setPatientToAssign(null); // Limpia el paciente seleccionado
    };

    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchPatients = async () => {
                try {
                    const data = await getPatients(userData.jwt);
                    setPatients(data.patientsRecord);
                    console.log(data); // Guardar los pacientes en el estado
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
            
            {/* Buscador */}
            <div className="flex justify-content-end mt-3">
                <InputText 
                    value={globalFilter} 
                    onChange={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Buscar..." 
                />
            </div>

            <DataTable 
                value={patients} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                className='mt-5'
                globalFilter={globalFilter} // Se pasa el filtro global
            >
                <Column field="name" header="Nombre" sortable />
                <Column field="email" header="Correo Electrónico" sortable />
                <Column field="dateOfBirth" header="Fecha de Nacimiento" />
                <Column header="Acción" body={assignButtonTemplate} />
            </DataTable>

            <ModalPatient visible={visible} setVisible={setVisible} />

            {/* Ventana de confirmación para asignar paciente */}
            <Dialog 
                visible={confirmationVisible} 
                style={{ width: '400px' }} 
                header="Confirmación" 
                onHide={handleCancelAssign}
            >
                <p>¿Está seguro de que desea asignar este paciente?</p>
                <div className="p-d-flex p-jc-end">
                    <Button label="Cancelar" icon="pi pi-times" onClick={handleCancelAssign} className="p-button-text" />
                    <Button label="Confirmar" icon="pi pi-check" onClick={handleConfirmAssign} autoFocus />
                </div>
            </Dialog>
        </>
    );
};
