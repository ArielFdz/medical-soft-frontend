/* import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ModalPatient from '../components/ModalPatient';
import { getPatients } from '../services/patientService'; 

import { useDataDoctoresStore } from '../store/useDataDoctoresStore';
import { asignPatientToDoctor } from '../services/patient-doctor';
import { Toast } from 'primereact/toast'; */

import { useState, useEffect } from 'react';
import { getSVG } from '../services/svgService';
import { odontologo } from '../../public/odontologo.svg'


export const Appointment = () => {

    let elementosSeleccionados = {};
    const dientesJSON = {
        'diente-1': {
            diente: 'Tercer molar superior',
            lado: 'izquierdo',
        },
        'diente-2': {
            diente: 'Segundo molar superior',
            lado: 'izquierdo',
        },
        'diente-3': {
            diente: 'Primer molar superior',
            lado: 'izquierdo',
        },
        'diente-4': {
            diente: 'Segundo premolar superior',
            lado: 'izquierdo',
        },
        'diente-5': {
            diente: 'Primer premolar superior',
            lado: 'izquierdo',
        },
        'diente-6': {
            diente: 'Canino superior',
            lado: 'izquierdo',
        },
        'diente-7': {
            diente: 'Incisivo lateral superior',
            lado: 'izquierdo',
        },
        'diente-8': {
            diente: 'Incisivo central superior',
            lado: 'izquierdo',
        },
        'diente-9': {
            diente: 'Incisivo central superior',
            lado: 'derecho',
        },
        'diente-10': {
            diente: 'Incisivo lateral superior',
            lado: 'derecho',
        },
        'diente-11': {
            diente: 'Canino superior',
            lado: 'derecho',
        },
        'diente-12': {
            diente: 'Primer premolar superior',
            lado: 'derecho',
        },
        'diente-13': {
            diente: 'Segundo premolar superior',
            lado: 'derecho',
        },
        'diente-14': {
            diente: 'Primero molar superior',
            lado: 'derecho',
        },
        'diente-15': {
            diente: 'Segundo molar superior',
            lado: 'derecho',
        },
        'diente-16': {
            diente: 'Tercer molar superior',
            lado: 'derecho',
        },
        'diente-17': {
            diente: 'Tercer molar inferior',
            lado: 'izquierdo',
        },
        'diente-18': {
            diente: 'Segundo molar inferior',
            lado: 'izquierdo',
        },
        'diente-19': {
            diente: 'Primer molar inferior',
            lado: 'izquierdo',
        },
        'diente-20': {
            diente: 'Segundo premolar inferior',
            lado: 'izquierdo',
        },
        'diente-21': {
            diente: 'Primer premolar inferior',
            lado: 'izquierdo',
        },
        'diente-22': {
            diente: 'Canino inferior',
            lado: 'izquierdo',
        },
        'diente-23': {
            diente: 'Incisivo lateral inferior',
            lado: 'izquierdo',
        },
        'diente-24': {
            diente: 'Incisivo central inferior',
            lado: 'izquierdo',
        },
        'diente-25': {
            diente: 'Incisivo central inferior',
            lado: 'derecho',
        },
        'diente-26': {
            diente: 'Incisivo lateral inferior',
            lado: 'derecho',
        },
        'diente-27': {
            diente: 'Canino inferior',
            lado: 'derecho',
        },
        'diente-28': {
            diente: 'Primer premolar inferior',
            lado: 'derecho',
        },
        'diente-29': {
            diente: 'Segundo premolar inferior',
            lado: 'derecho',
        },
        'diente-30': {
            diente: 'Primero molar inferior',
            lado: 'derecho',
        },
        'diente-31': {
            diente: 'Segundo molar inferior',
            lado: 'derecho',
        },
        'diente-32': {
            diente: 'Tercer molar inferior',
            lado: 'derecho',
        },
    };
    const especialidad = 'odontologo';

    let [elementoSVG, setElementoSVG] = useState('');

    useEffect(() => {
        const obtenerSVG = async () => {
            const svg = await getSVG(especialidad);
            setElementoSVG(svg);
        };
        obtenerSVG();
    }, []);





    const cancelar = () => {
        console.log('Cancelar', elementosSeleccionados, dientesJSON);
    }
    return (
        <>
            <h1>Cita</h1>
            <div className="container">
                <div className="divider">
                    <div className="especialidad">

                        <div id="elementoSVG" className="elemento-svg">
                            <odontologo />
                        </div>
                    </div>
                    <div className="paciente">
                        {/* <h1>{{ this.tratamiento.get("specialty")?.value | titlecase }}</h1> */}

                        <div className="buttons">
                            <button>Cancelar</button>
                            <button onClick="guardarTratamiento()" > Guardar</button >
                        </div >
                    </div >
                </div >
            </div >

        </>
    );
};
