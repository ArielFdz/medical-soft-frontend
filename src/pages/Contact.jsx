import React from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

export const Contact = () => {
    return (
        <div className="p-4">
            <h2>Contáctanos</h2>
            <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en enviarnos un mensaje.</p>
            <div className="p-fluid">
                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" placeholder="Tu nombre completo" />
                </div>
                <div className="field">
                    <label htmlFor="email">Correo Electrónico</label>
                    <InputText id="email" placeholder="Tu correo electrónico" />
                </div>
                <div className="field">
                    <label htmlFor="message">Mensaje</label>
                    <InputTextarea id="message" rows={5} placeholder="Escribe tu mensaje aquí" />
                </div>
                <Button label="Enviar" />
            </div>
        </div>
    );
};
