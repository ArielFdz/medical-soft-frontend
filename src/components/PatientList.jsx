import React, { useState, useEffect } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from 'primereact/utils';
import { getPatientsxDoctor } from "../services/patient-doctor";
import { useDataDoctoresStore } from "../store/useDataDoctoresStore";
import { ModalAppointmentsById } from "./ModalAppointmentsById";

const PatientList = () => {
    const { userData } = useDataDoctoresStore();
    const [patientsxDoctor, setPatientsxDoctor] = useState([]);

    useEffect(() => {
        if (userData && userData.jwt) {
            const fetchPatientsxDoctor = async () => {
                try {
                    const data = await getPatientsxDoctor(userData.jwt);
                    setPatientsxDoctor(data.patientDoctorRecords);
                } catch (error) {
                    console.error('Error al obtener los pacientes:', error);
                }
            };
            fetchPatientsxDoctor();
        }
    }, []);

    const [layout, setLayout] = useState("list");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = (patient) => {
        setSelectedPatient(patient);
        setIsModalVisible(true);
    };

    const itemTemplate = (record, layout) => {
        const { patient } = record;

        if (layout === "list") {
            return (
                <div className="col-12" key={patient.id}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': record.index !== 0 })}>
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{patient.name}</div>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-envelope"></i>
                                        <span className="font-semibold">{patient.email}</span>
                                    </span>
                                </div>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-id-card"></i>
                                        <span className="font-semibold">{patient.bloodType}</span>
                                    </span>
                                </div>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-phone"></i>
                                        <span className="font-semibold">{patient.personalNumber}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <Button
                                    label="Ver citas"
                                    icon="pi pi-calendar"
                                    className="p-button-rounded"
                                    onClick={() => openModal(patient)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (layout === "grid") {
            return (
                <div className="col-12 sm:col-6 lg:col-4 p-2" key={patient.id}>
                    <div className="p-4 border-1 surface-border surface-card border-round">
                        <div className="flex flex-column align-items-center gap-3 py-3">
                            <div className="text-2xl font-bold">{patient.name}</div>
                        </div>
                        <div className="flex flex-column align-items-start gap-2">
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-envelope"></i>
                                <span className="font-semibold">{patient.email}</span>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-id-card"></i>
                                <span className="font-semibold">Tipo de Sangre: {patient.bloodType}</span>
                            </div>
                            <div className="flex align-items-center gap-2">
                                <i className="pi pi-phone"></i>
                                <span className="font-semibold">Tel: {patient.personalNumber}</span>
                            </div>
                        </div>
                        <div className="flex justify-content-end pt-3">
                            <Button
                                label="Ver citas"
                                icon="pi pi-calendar"
                                className="p-button-rounded"
                                onClick={() => openModal(patient)}
                            />
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <h1>Mis pacientes</h1>
            <DataView
                value={patientsxDoctor}
                layout={layout}
                itemTemplate={itemTemplate}
                header={
                    <div className="flex justify-content-end">
                        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />

                    </div>
                }
            />

            {isModalVisible && (
                // <div className="modal">
                //     <h3>Citas de {selectedPatient?.name}</h3>
                //     <Button
                //         label="Cerrar"
                //         onClick={() => setIsModalVisible(false)}
                //         className="p-button-danger"
                //     />
                // </div>
                <ModalAppointmentsById paciente={selectedPatient} visible={isModalVisible} setVisible={setIsModalVisible} />
            )}
        </>
    );
};

export default PatientList;
