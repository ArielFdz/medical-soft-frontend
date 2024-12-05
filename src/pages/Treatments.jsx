import { useState, useEffect, useRef } from "react";

import { getSVG } from "../services/svgService";
import { ReactSVG } from "react-svg";
import { specialities } from "../services/specialities";
import { useNavigate, useParams } from "react-router-dom";
import { useDataDoctoresStore } from "../store/useDataDoctoresStore";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { createTreatment, getTreatment, updateTreatment } from "../services/treatmentService";
import { Chips } from "primereact/chips";

export const Treatments = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const { userData } = useDataDoctoresStore();
    const doctorSpeciality = (userData.doctorRecord.specialty).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const [svgFile, setSvgFile] = useState("");

    const svgContainer = document.getElementById("svgContainer");

    const selectedElements = useRef({});

    const specialityElements = specialities[doctorSpeciality];

    const [auxForm, setAuxForm] = useState({
        "alergias": [],
        "enfermedadesCronicas": [],
        "historialQuirurgico": [],
        "enfermedadesHeredoParentales": []
    });

    const [treatmentForm, setTreatmentForm] = useState({
        "description": "",
        "specialty": doctorSpeciality,
        "tratamientoRealizado": "",
        "partesTocadasDuranteElTratamiento": "",
        "alergias": [],
        "enfermedadesCronicas": [],
        "historialQuirurgico": [],
        "enfermedadesHeredoParentales": [],
        "appointmentId": id
    });

    useEffect(() => {

        const obtenerSVG = async () => {
            const svg = await getSVG(doctorSpeciality);
            setSvgFile(svg);
            if (svgFile != "") {
                svgContainer.innerHTML = svg;
                asignarFuncionalidadAElementos();
            } else {
                console.log("No se pudo obtener el svg");
            }
        };

        const localTreatment = async () => {
            const localTreatment = await getTreatment(userData.jwt, id)
            if (localTreatment.treatments.length > 0) {

                console.log(localTreatment);
                //localTreatment.treatments[0]['partesTocadasDuranteElTratamiento'] = JSON.parse(localTreatment.treatments[0].partesTocadasDuranteElTratamiento)
                selectedElements.current = JSON.parse(localTreatment.treatments[0].partesTocadasDuranteElTratamiento)
                setTreatmentForm((prev) => ({ ...prev, ...localTreatment.treatments[0] }))
            } else {
                console.log("No se encontró el tratamiento");
            }
        }

        localTreatment();
        obtenerSVG();
    }, [svgFile]);

    const handleInputChange = (e, field) => {
        const value = e.target?.value;
        setTreatmentForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleTextAreaChange = (e, field) => {
        let value = e.target?.value;
        setAuxForm((prev) => ({ ...prev, [field]: value.split('\n') }));
        console.log("auxForm", auxForm);

        setTreatmentForm((prev) => ({ ...prev, [field]: value }));
        console.log("treatmentForm", treatmentForm);

    };

    const handleSelectedElementChange = () => {
        setTreatmentForm((prev) => ({
            ...prev,
            ["partesTocadasDuranteElTratamiento"]: JSON.stringify(selectedElements.current)
        }))
    }






    const asignarFuncionalidadAElementos = () => {
        const svgElement = svgContainer.querySelector("#elemento-svg");
        /* svgElement.style.width = "100%";*/
        svgElement.style.height = "75vh";
        svgElement.style.preserveAspectRatio = "xMidYMid meet";
        if (svgElement) {
            const elements = svgElement.querySelectorAll("[id^='elemento-']");

            elements.forEach((element) => {
                element.addEventListener("click", () => {
                    if (!selectedElements.current[element.id]) {
                        selectedElements.current[element.id] = specialityElements[element.id];
                    } else {
                        delete selectedElements.current[element.id];
                    }
                    handleSelectedElementChange();
                });

                element.addEventListener("mouseover", () => {
                    if (!selectedElements.current[element.id]) {
                        const selection = element.querySelector("#seleccion");
                        selection.style.fill = "#004d40";
                    }
                });

                element.addEventListener("mouseout", () => {
                    if (!selectedElements.current[element.id]) {
                        const selection = element.querySelector("#seleccion");
                        selection.style.fill = specialityElements[element.id].color;
                    }
                });
            });
            pintarElementosSeleccionados();
        } else {
            console.log("No se encontró el elemento SVG");
        }
    };

    const pintarElementosSeleccionados = () => {

        const elementos = svgContainer.querySelectorAll('[id^="elemento-"]');

        elementos.forEach((elemento) => {

            let elementoId = elemento.getAttribute('id');


            if (selectedElements.current[elementoId]) {

                const selection = elemento.querySelector('#seleccion');
                selection.style.fill = '#004d40';
            }
        })
    }


    const handleSubmit = () => {
        if (treatmentForm.id) {
            const treatmentId = treatmentForm.id
            delete treatmentForm.id
            delete treatmentForm.appointmentId
            delete treatmentForm.createdAt
            delete treatmentForm.updatedAt

            updateTreatment(treatmentForm, userData.jwt, treatmentId)
        } else {
            createTreatment(treatmentForm, userData.jwt)
        }
        navigate('/mypatients')
    };

    return (
        <>
            <h1>Cita</h1>
            <div className="container">
                <div className="divider" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="speciality" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div id="svgContainer" className="svg-element">
                            {/* <ReactSVG src="especialidades/odontologo.svg" /> */}
                        </div>
                    </div>
                    <div className="patient-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>{doctorSpeciality.toUpperCase()}</h1>
                        <div >
                            <label htmlFor="description" className="block text-900 font-medium mb-2">
                                Descripción
                            </label>
                            <InputText className="col-12" id="description" value={treatmentForm.description} onChange={(e) => handleInputChange(e, "description")} />

                            <label htmlFor="tratamientoRealizado" className="block text-900 font-medium mb-2">
                                Tratamiento realizado
                            </label>
                            <InputText className="col-12" id="tratamientoRealizado" value={treatmentForm.tratamientoRealizado} onChange={(e) => handleInputChange(e, "tratamientoRealizado")} />

                            <label htmlFor="alergias" className="block text-900 font-medium mb-2">
                                Alergias
                            </label>
                            <Chips className="" value={treatmentForm.alergias} onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["alergias"]: e.value }))} />

                            <label htmlFor="enfermedadesCronicas" className="block text-900 font-medium mb-2">
                                Enfermedades crónicas
                            </label>
                            <Chips className="" value={treatmentForm.enfermedadesCronicas} onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["enfermedadesCronicas"]: e.value }))} />


                            <label htmlFor="historialQuirurgico" className="block text-900 font-medium mb-2">
                                Historial quirúrgico
                            </label>
                            <Chips className="" value={treatmentForm.historialQuirurgico} onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["historialQuirurgico"]: e.value }))} />

                            <label htmlFor="enfermedadesHeredoParentales" className="block text-900 font-medium mb-2">
                                Enfermedades hereditarias
                            </label>
                            <Chips className="" value={treatmentForm.enfermedadesHeredoParentales} onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["enfermedadesHeredoParentales"]: e.value }))} />
                        </div>

                        <div className="buttons">
                            <button onClick={() => navigate('/mypatients')}>Cancelar</button>
                            <button onClick={handleSubmit}> Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};