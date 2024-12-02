import { Accordion, AccordionTab } from 'primereact/accordion'
import React from 'react'
import { Divider } from 'primereact/divider'

export const Directory = () => {

    const especialidades = [
        {
            nombre: "Cardiología",
            medicos: [
                { nombre: "Dr. Juan Pérez", correo: "juan.perez@example.com" },
                { nombre: "Dra. María López", correo: "maria.lopez@example.com" }
            ]
        },
        {
            nombre: "Neurología",
            medicos: [
                { nombre: "Dr. Carlos García", correo: "carlos.garcia@example.com" },
                { nombre: "Dra. Ana Ruiz", correo: "ana.ruiz@example.com" }
            ]
        },
        {
            nombre: "Dermatología",
            medicos: [
                { nombre: "Dr. José Fernández", correo: "jose.fernandez@example.com" },
                { nombre: "Dra. Laura Gómez", correo: "laura.gomez@example.com" }
            ]
        }
    ];

  return (
    <>
            <h1>Directorio médico</h1>
            <Accordion>
                {especialidades.map((especialidad, index) => (
                    <AccordionTab key={index} header={especialidad.nombre}>
                        {especialidad.medicos.map((medico, medicoIndex) => (
                            <React.Fragment key={medicoIndex}>
                                <p className="m-0">
                                    <strong>{medico.nombre}</strong>
                                    <br />
                                    {medico.correo}
                                </p>
                                {medicoIndex < especialidad.medicos.length - 1 && (
                                    <Divider />
                                )}
                            </React.Fragment>
                        ))}
                    </AccordionTab>
                ))}
            </Accordion>
    </>
  )
}