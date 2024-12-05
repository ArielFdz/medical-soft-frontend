import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalAppointment from "./ModalAppointment";
import { useState, useEffect } from "react";
import { useDataDoctoresStore } from "../store/useDataDoctoresStore";
import { getAppointments } from "../services/appointmentService";
import { ModalEditAppointment } from "./ModalEditAppointment";
import { SelectButton } from "primereact/selectbutton";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const { userData } = useDataDoctoresStore();
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleModalEdit, setVisibleModalEdit] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState();
    const [dataSeleccionada, setDataSeleccionada] = useState();
    const [events, setEvents] = useState([]);
    const [valueFilter, setValueFilter] = useState(null);

    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchAppointments = async () => {
                try {
                    const data = await getAppointments(userData.jwt, valueFilter ?? 'PENDIENTE');
                    const formattedEvents = data.map(appointment => {
                        const startDate = moment(`${appointment.appointmentDate} ${appointment.appointmentTime}`, "YYYY-MM-DD HH:mm:ss").toDate();
                        const endDate = moment(`${appointment.appointmentDate} ${appointment.appointmentTimeEnd}`, "YYYY-MM-DD HH:mm:ss").toDate();

                        return {
                            title: `Cita con ${appointment.patientWithDoctor.patient.name}`,
                            start: startDate,
                            end: endDate,
                            appointment: appointment,
                        };
                    });
                    setEvents(formattedEvents);
                } catch (error) {
                    console.error('Error al obtener las citas:', error);
                }
            };
            fetchAppointments();
        }
        // setValueFilter('PENDIENTE');
    }, [userData, visibleModal, visibleModalEdit, valueFilter]);

    const openModal = (slotInfo) => {
        setVisibleModal(true);
        setFechaSeleccionada(slotInfo);
        console.log(fechaSeleccionada);
    };

    const openModalEdit = (info) => {
        setVisibleModalEdit(true);
        setDataSeleccionada(info);
    };

    const filters = [
        { name: 'Citas pendientes', value: 'PENDIENTE' },
        { name: 'Citas finalizadas', value: 'FINALIZADA' },
        { name: 'Citas canceladas', value: 'CANCELADA' }
    ];

    return (
        <>
            <ModalAppointment visible={visibleModal} setVisible={setVisibleModal} date={fechaSeleccionada} />

            <div className="flex justify-content-center mb-8">
                <SelectButton value={valueFilter ?? 'PENDIENTE'} onChange={(e) => setValueFilter(e.value)} optionLabel="name" optionValue="value" options={filters} multiple={false} />
            </div>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                step={60}
                onSelectSlot={(slotInfo) => openModal(slotInfo)}
                onSelectEvent={(eventInfo) => openModalEdit(eventInfo)}
                selectable
            />
            <ModalEditAppointment visible={visibleModalEdit} setVisible={setVisibleModalEdit} data={dataSeleccionada} />
        </>
    );
};

export default MyCalendar;