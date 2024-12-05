import { useState, useEffect, useRef } from "react";

import { getSVG } from "../services/svgService";
import { ReactSVG } from "react-svg";
import { specialities } from "../services/specialities";

export const AppointmentsTest = () => {

    const doctorSpeciality = "odontologo";
    const [svgFile, setSvgFile] = useState("");

    const svgContainer = document.getElementById("svgContainer");

    /* let [originalColor, setOriginalColor] = useState(''); */
    const originalColor = useRef('');

    const selectedElements = useRef({});
    const specialityElements = specialities[doctorSpeciality];


    useEffect(() => {
        obtenerSVG();
    }, [svgFile]);

    const obtenerSVG = async () => {
        const svg = await getSVG(doctorSpeciality);
        setSvgFile(svg);
        if (svgFile != "") {
            console.log("Se obtuvo el svg");
            svgContainer.innerHTML = svg;
            asignarFuncionalidadAElementos();
        } else {
            console.log("No se pudo obtener el svg");
        }
    };

    const asignarFuncionalidadAElementos = () => {
        const svgElement = svgContainer.querySelector("#elemento-svg");
        if (svgElement) {
            const elements = svgElement.querySelectorAll("[id^='elemento-']");

            elements.forEach((element) => {
                element.addEventListener("click", () => {
                    if (!selectedElements.current[element.id]) {
                        selectedElements.current[element.id] = specialityElements[element.id];
                    } else {
                        delete selectedElements.current[element.id];
                    }
                });

                element.addEventListener("mouseover", () => {
                    if (!selectedElements.current[element.id]) {
                        const selection = element.querySelector("#seleccion");
                        originalColor.current = selection.style.fill;
                        selection.style.fill = "red";
                    }
                });

                element.addEventListener("mouseout", () => {
                    if (!selectedElements.current[element.id]) {
                        const selection = element.querySelector("#seleccion");
                        selection.style.fill = originalColor.current;
                    }
                });
            });
        } else {
            console.log("No se encontró el elemento SVG");
        }
    };

    const cancelar = () => {
        console.log("Cancelar", selectedElements, dientesJSON);
    };
    return (
        <>
            <h1>Cita</h1>
            <div className="container">
                <div className="divider">
                    <div className="speciality">
                        <div id="svgContainer" className="svg-element">
                            {/* <ReactSVG src="especialidades/odontologo.svg" /> */}
                        </div>
                    </div>
                    <div className="patient-info">
                        {/* <h1>{{ this.tratamiento.get("specialty")?.value | titlecase }}</h1> */}

                        <div className="buttons">
                            <button>Cancelar</button>
                            <button onClick={cancelar}> Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
