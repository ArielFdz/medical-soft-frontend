import { Accordion, AccordionTab } from 'primereact/accordion';
import React, { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { fetchDoctorsBySpecialtyAndUser } from '../services/dashboardPatients';
import { useDataPatientsStore } from '../store/useDataPatientsStore';
import { getAppointmentsOpen } from '../services/appointmentService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const DashBoardPatients = () => {
    const { userData } = useDataPatientsStore();  // Obtener datos del usuario
    const [doctorData, setDoctorData] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Especialidades configuradas previamente.
    const specialties = ["ODONTÓLOGO", "GASTROENTERÓLOGO", "CARDIÓLOGO"];

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                setLoading(true);
                
                const doctorPromises = specialties.map(async (specialty) => {
                    // Llamada a la API para obtener los médicos por especialidad y correo del usuario
                    const response = await fetchDoctorsBySpecialtyAndUser(specialty, userData.email);
                    const responseAppointments = await getAppointmentsOpen(userData)
                console.log({responseAppointments})
                setAppointments(responseAppointments)
                    // Verificar la respuesta de la API
                    console.log('Médicos obtenidos para especialidad', specialty, response);
                    
                    // Extraemos los médicos de la respuesta
                    const medicos = response.patientDoctorRecords.map((record) => ({
                        name: record.doctor.name,
                        specialty: record.doctor.specialty,
                        email: record.doctor.email,
                        phone: record.doctor.phone,
                        professionalId: record.doctor.professionalId
                    }));

                    return medicos;
                });

                // Esperamos que todas las promesas se resuelvan
                const doctorResults = await Promise.all(doctorPromises);

                // Aplanamos los resultados y los asignamos al estado
                setDoctorData(doctorResults.flat());

                // Para depuración: Verificar los datos antes de asignarlos al estado
                console.log('Datos de los doctores:', doctorResults.flat());
            } catch (err) {
                setError('No se pudieron cargar los datos de los doctores');
                console.error('Error al cargar datos de los doctores:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [userData.email]); // Dependemos del email del usuario

    if (loading) {
        return <p>Cargando información del doctor...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (doctorData.length === 0) {
        return <p>No se encontraron médicos disponibles.</p>;
    }

    return (
        <>
        <h1>Mi información</h1>
        <div className='flex w-full'>
            
            <div className=' flex-column w-6 p-2'>
                <h1>Consultando con:</h1>
            <Accordion>
                {doctorData.map((doctor, index) => (
                    <AccordionTab key={index} header={`Dr. ${doctor.name} - ${doctor.specialty}`}>
                        <p className="m-0">
                            <strong>Nombre: </strong>{doctor.name}
                            <br />
                            <strong>Especialidad: </strong>{doctor.specialty}
                            <br />
                            <strong>Email: </strong>{doctor.email}
                            <br />
                            <strong>Teléfono: </strong>{doctor.phone}
                            <br />
                            <strong>ID Profesional: </strong>{doctor.professionalId}
                        </p>
                        {index < doctorData.length - 1 && <Divider />}
                    </AccordionTab>
                ))}
            </Accordion>

            </div>
                

            <div className=' flex-column w-6 p-2'>
            <h1>Citas próximas</h1>
            <DataTable
                value={appointments} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                className=' w-full '
            >
                <Column field="patientWithDoctor.doctor.name" header="Médico" sortable />
                <Column field="patientWithDoctor.doctor.specialty" header="Especialidad" sortable />
                <Column field="patientWithDoctor.doctor.consultationFee" header="Consultorio" sortable />
                <Column field="appointmentDate" header="Fecha" sortable />
                <Column field="appointmentTime" header="Hora de inicio" sortable />
                <Column field="appointmentTimeEnd" header="Hora de finalizacion" sortable />
                
                
            </DataTable>
            </div>
            
        </div>
          
            

        </>
    );
};
