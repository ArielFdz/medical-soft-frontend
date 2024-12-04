import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { getPatientsxDoctor } from '../services/patient-doctor';
import { DropdownWithValue } from './DropdownWithValue';
import { putAppointment } from '../services/appointmentService';
import { Toast } from 'primereact/toast';

export const ModalEditAppointment = ({ visible, setVisible, data }) => {
    const { userData } = useDataDoctoresStore();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [patientsxDoctor, setPatientsxDoctor] = useState([]);
    const toast = React.useRef(null);

    console.log();

    const footerContent = data?.appointment?.status == 'PENDIENTE' ? (
        <div>
            <Button label="Cancelar cita" icon="pi pi-times" onClick={() => handleSubmit('CANCELADA')} />
            <Button label="Editar cita" icon="pi pi-pencil" onClick={() => handleSubmit('PENDIENTE')} />
            <Button label="Completar cita" icon="pi pi-check" onClick={() => handleSubmit('FINALIZADA')} autoFocus />
        </div>
    ) : null;

    const handleDropdownChange = (e) => {
        setSelectedPatient(e.value);
    };

    const handleTime = (time) => {
        setTimeStart(time);
        const newTimeEnd = new Date(time);
        newTimeEnd.setHours(newTimeEnd.getHours() + 1);
        setTimeEnd(newTimeEnd);
    };

    const formatTimeToMilitary = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleSubmit = async (status) => {

        let formValues;

        if (status == 'PENDIENTE') {
            formValues = {
                // idPatientWithDoctor: selectedPatient,
                appointmentDate: appointmentDate,
                appointmentTime: formatTimeToMilitary(timeStart),
                appointmentTimeEnd: formatTimeToMilitary(timeEnd),
                status: status
            };
        } else {
            formValues = {
                status: status
            };
        }

        try {
            await putAppointment(formValues, userData.jwt, data.appointment.id);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Actualización exitosa.' });
            setVisible(false);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${error.message}` });
        }
    };

    useEffect(() => {
        setTimeStart(data?.start);
        setTimeEnd(data?.end);
        setAppointmentDate(data?.start);
        if (data && patientsxDoctor.length > 0) {
            const patient = data?.appointment?.patientWithDoctor?.id;
            setSelectedPatient(patient);
            console.log(patient);
        }
    }, [data, patientsxDoctor]);

    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchPatientsxDoctor = async () => {
                try {
                    const data = await getPatientsxDoctor(userData.jwt);
                    const patients = data.patientDoctorRecords.map(record => ({
                        name: record.patient.name,
                        val: record.id
                    }));
                    setPatientsxDoctor(patients);
                } catch (error) {
                    console.error('Error al obtener los pacientes:', error);
                }
            };
            fetchPatientsxDoctor();
        }
    }, [userData, visible]);

    return (
        <>
            <Toast ref={toast} />
            <Dialog header={data?.appointment?.status == 'PENDIENTE' ? "Editar cita" : 'Información cita'} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>

                <label htmlFor="idPatientWithDoctor" className="block text-900 font-medium mb-2">Paciente</label>
                <DropdownWithValue
                    id="idPatientWithDoctor"
                    items={patientsxDoctor}
                    value={selectedPatient}
                    onChange={handleDropdownChange}
                    classError={`w-full mb-3`}
                    disabled={true}
                />

                <label htmlFor="appointmentDate" className="block text-900 font-medium mb-2">Fecha de la cita</label>
                <Calendar
                    id="appointmentDate"
                    placeholder="Fecha de cita"
                    className={`w-full mb-3`}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.value)}
                    dateFormat="dd/mm/yy"
                    disabled={data?.appointment?.status == 'PENDIENTE' ? false : true}
                />

                <label htmlFor="appointmentTime" className="block text-900 font-medium mb-2">Hora Inicio</label>
                <Calendar
                    id="appointmentTime"
                    placeholder="Hora de inicio de la cita"
                    className={`w-full mb-3`}
                    value={timeStart}
                    onChange={(e) => handleTime(e.value)}
                    timeOnly
                    disabled={data?.appointment?.status == 'PENDIENTE' ? false : true}
                />

                <label htmlFor="appointmentTimeEnd" className="block text-900 font-medium mb-2">Hora Fin</label>
                <Calendar
                    id="appointmentTimeEnd"
                    placeholder="Hora de finalización de la cita"
                    className={`w-full mb-3`}
                    value={timeEnd}
                    timeOnly
                    disabled
                />
            </Dialog>
        </>
    )
}
