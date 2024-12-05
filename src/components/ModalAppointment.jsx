import React, { useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from "primereact/calendar";
import { useDataDoctoresStore } from "../store/useDataDoctoresStore";
import { getPatientsxDoctor } from "../services/patient-doctor";
import { Dropdown } from "./Dropdown";
import { postAppointment } from "../services/appointmentService";
import { Toast } from "primereact/toast";

export default function ModalAppointment({ visible, setVisible, date }) {
    const { userData } = useDataDoctoresStore();
    const [timeStart, setTimeStart] = useState(null);
    const [timeEnd, setTimeEnd] = useState(null);
    const [patientsxDoctor, setPatientsxDoctor] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(date?.start);
    const [errors, setErrors] = useState({});
    const toast = React.useRef(null);

    useEffect(() => {
        setTimeStart(date?.start);
        setTimeEnd(date?.end);
        setAppointmentDate(date?.start);
    }, [date]);

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

    const handleTime = (time) => {
        setTimeStart(time);
        const newTimeEnd = new Date(time);
        newTimeEnd.setHours(newTimeEnd.getHours() + 1);
        setTimeEnd(newTimeEnd);
    };

    const handleDropdownChange = (e) => {
        setSelectedPatient(e.value);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!selectedPatient) newErrors.selectedPatient = 'El paciente es obligatorio.';
        if (!appointmentDate) newErrors.appointmentDate = 'La fecha es obligatoria.';
        if (!timeStart) newErrors.timeStart = 'La hora de inicio es obligatoria.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatTimeToMilitary = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const formValues = {
                idPatientWithDoctor: selectedPatient,
                appointmentDate: appointmentDate,
                appointmentTime: formatTimeToMilitary(timeStart),
                appointmentTimeEnd: formatTimeToMilitary(timeEnd)
            };

            try {
                await postAppointment(formValues, userData.jwt);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso.' });
                setVisible(false);
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: `${error.message}` });
            }
        }
    };

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Agendar" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    return (
        <>
            <Toast ref={toast} />

            <Dialog header="Agendar cita" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} footer={footerContent}>
                <label htmlFor="idPatientWithDoctor" className="block text-900 font-medium mb-2">Paciente</label>
                <Dropdown
                    id="idPatientWithDoctor"
                    items={patientsxDoctor}
                    onChange={handleDropdownChange}
                    classError={`w-full mb-3 ${errors.selectedPatient ? 'p-invalid' : ''}`}
                />
                {errors.selectedPatient && <small className="p-error">{errors.selectedPatient}</small>}

                <label htmlFor="appointmentDate" className="block text-900 font-medium mb-2">Fecha de la cita</label>
                <Calendar
                    id="appointmentDate"
                    placeholder="Fecha de cita"
                    className={`w-full mb-3 ${errors.appointmentDate ? 'p-invalid' : ''}`}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.value)}
                    dateFormat="dd/mm/yy"
                />
                {errors.appointmentDate && <small className="p-error">{errors.appointmentDate}</small>}

                <label htmlFor="appointmentTime" className="block text-900 font-medium mb-2">Hora Inicio</label>
                <Calendar
                    id="appointmentTime"
                    placeholder="Hora de inicio de la cita"
                    className={`w-full mb-3 ${errors.timeStart ? 'p-invalid' : ''}`}
                    value={timeStart}
                    onChange={(e) => handleTime(e.value)}
                    timeOnly
                />
                {errors.timeStart && <small className="p-error">{errors.timeStart}</small>}

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
    );
}
