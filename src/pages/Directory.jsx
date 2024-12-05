import { Accordion, AccordionTab } from 'primereact/accordion';
import React, { useEffect, useState } from 'react';
import { Divider } from 'primereact/divider';
import { fetchDoctorsBySpecialty } from '../services/doctorService';

export const Directory = () => {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const specialties = ["ODONTÓLOGO", "GASTROENTERÓLOGO", "CARDIÓLOGO"]; // Especialidades configuradas previamente.

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const promises = specialties.map((specialty) =>
                    fetchDoctorsBySpecialty(specialty).then((medicos) => ({
                        nombre: specialty,
                        medicos: medicos.map((medico) => ({
                            nombre: medico.name,
                            correo: medico.email,
                            phone: medico.phone
                        })),
                    }))
                );

                const result = await Promise.all(promises);
                setEspecialidades(result);
            } catch (err) {
                setError('Error al cargar el directorio médico.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando directorio...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <h1>Directorio médico</h1>
            <Accordion>
                {especialidades.map((especialidad, index) => (
                    <AccordionTab key={index} header={especialidad.nombre}>
                        {especialidad.medicos.map((medico, medicoIndex) => (
                            <React.Fragment key={medicoIndex}>
                                <p className="m-0">
                                    <strong>Dr. {medico.nombre}</strong>
                                    <br />
                                    {medico.correo}
                                    <br />
                                    <span className='font-italic'>{medico.phone}</span>
                                </p>
                                {medicoIndex < especialidad.medicos.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </AccordionTab>
                ))}
            </Accordion>
        </>
    );
};
