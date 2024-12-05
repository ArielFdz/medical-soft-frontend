import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalPatient from '../components/ModalPatient';
import { getPatients } from '../services/patientService'; 
import { useParams } from "react-router-dom";
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { asignPatientToDoctor } from '../services/patient-doctor';
import { Toast } from 'primereact/toast';
import { getFilesId } from '../services/files';
import ModalFile from '../components/ModalFile';


export const Files = () => {
    const [visible, setVisible] = useState(false);
    const [patients, setPatients] = useState([]);
    const { userData } = useDataDoctoresStore(); 
    const toast = React.useRef(null);
    const { id } = useParams();

    const Download = (rowData) => {
        return (
            <Button 
                label="Descargar" 
                icon="pi pi-download" 
                onClick={() => handleDownload(rowData)}
            />
        );
    };

    const See = (rowData) => {
      return (
          <Button 
              label="Ver" 
              icon="pi pi-eye" 
              onClick={() => handleSee(rowData)}
          />
      );
  };
    const handleSee = async (id) => {
      console.log(id)
      //  const patientData = { idPatient: id };
        console.log(id.see)
        window.open(`${id.see}`, '_blank')
    };

     const handleDownload = async (id) => {
      console.log(id)
      //  const patientData = { idPatient: id };
        console.log(id.see)
        window.open(`${id.download}`, '_blank')
    };





    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchPatients = async () => {
                try {
                    const data = await getFilesId(id);
                    console.log(data)
                    setPatients(data.filesRecordWithImg);
                    
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
            <h1>Evidencias cita</h1>
            <Toast ref={toast} />
            <Button label="Adjuntar evidencia" icon="pi pi-external-link" onClick={() => setVisible(true)} />
            
            <DataTable value={patients} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} className='mt-5'>
                <Column field="fileRecord.description" header="Descripcion" sortable />
                <Column field="fileRecord.createdAt" header="Creado"  />
                <Column header="Ver" body={See} />
                <Column header="Descargar" body={Download} />
            </DataTable>

            <ModalFile visible={visible} setVisible={setVisible} />
        </>
    );
};
