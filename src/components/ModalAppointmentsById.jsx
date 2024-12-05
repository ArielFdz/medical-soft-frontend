import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { getAppointmentsxPatient } from '../services/appointmentService';
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';  // Importa InputText
import { useNavigate } from 'react-router-dom';

export const ModalAppointmentsById = ({ paciente, visible, setVisible }) => {
    const { userData } = useDataDoctoresStore();
    const [citasxPaciente, setCitasxPaciente] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);  // Estado para el filtro global
    const navigate = useNavigate();

    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchPatients = async () => {
                try {
                    const data = await getAppointmentsxPatient(userData.jwt, paciente?.id);
                    setCitasxPaciente(data);
                } catch (error) {
                    console.error('Error al obtener los pacientes:', error);
                }
            };
            fetchPatients();
        }
    }, [paciente, visible]);

    const handleVerTratamiento = (cita) => {
        navigate(`/treatments/${cita?.id}`)
    };

    const handleVerArchivos = (cita) => {
        navigate(`/evidencias/${cita?.id}`)
    };

    return (
        <>
            <Dialog header={"Citas"} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                    <div className='flex justify-content-end'>
                        <InputText
                            type="search"
                            onInput={(e) => setGlobalFilter(e.target.value)}
                            placeholder="Buscar..."
                            className="p-inputtext-sm "
                        /></div>
                </div>
                <DataTable
                    value={citasxPaciente}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    className='mt-2'
                    globalFilter={globalFilter}  // Se aplica el filtro global
                >
                    <Column field="appointmentDate" header="Fecha cita" sortable />
                    <Column field="status" header="Estatus" sortable />
                    <Column header="Acciones" body={(rowData) => (
                        <div className="p-d-flex p-ai-center">
                            <Button
                                label="Administrar tratamiento"
                                icon="pi pi-file"
                                onClick={() => handleVerTratamiento(rowData)}
                                className="p-button-sm button-info mr-2"
                            />
                            <Button
                                label="Adjuntar evidencia"
                                icon="pi pi-image"
                                onClick={() => handleVerArchivos(rowData)}
                                className="p-button-sm button-info"
                            />
                        </div>
                    )} />
                </DataTable>
            </Dialog>
        </>
    );
};
