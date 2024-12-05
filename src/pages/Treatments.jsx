import { useState, useEffect, useRef } from "react";
import { getSVG } from "../services/svgService";
import { specialities } from "../services/specialities";
import { useNavigate, useParams } from "react-router-dom";
import { useDataDoctoresStore } from "../store/useDataDoctoresStore";
import { InputText } from "primereact/inputtext";
import { createTreatment, getTreatment, updateTreatment } from "../services/treatmentService";
import { Chips } from "primereact/chips";
import { Button } from 'primereact/button';

export const Treatments = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useDataDoctoresStore();
    const doctorSpeciality = (userData.doctorRecord.specialty).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const [svgFile, setSvgFile] = useState("");
    const svgContainer = document.getElementById("svgContainer");
    const selectedElements = useRef({});
    const specialityElements = specialities[doctorSpeciality];

    const [treatmentForm, setTreatmentForm] = useState({
        description: "",
        specialty: doctorSpeciality,
        tratamientoRealizado: "",
        partesTocadasDuranteElTratamiento: "",
        alergias: [],
        enfermedadesCronicas: [],
        historialQuirurgico: [],
        enfermedadesHeredoParentales: [],
        appointmentId: id
    });

    const [errors, setErrors] = useState({
        description: '',
        tratamientoRealizado: '',
        alergias: '',
        enfermedadesCronicas: '',
        historialQuirurgico: '',
        enfermedadesHeredoParentales: ''
    });

    useEffect(() => {

        const obtenerSVG = async () => {
            const svg = await getSVG(doctorSpeciality);
            setSvgFile(svg);
            if (svgFile !== "") {
                svgContainer.innerHTML = svg;
                asignarFuncionalidadAElementos();            
            } else {
                console.log("No se pudo obtener el svg");
            }
        };

        const localTreatment = async () => {
            const localTreatment = await getTreatment(userData.jwt, id);
            if (localTreatment.treatments.length > 0) {
                selectedElements.current = JSON.parse(localTreatment.treatments[0].partesTocadasDuranteElTratamiento);
                pintarElementosSeleccionados();
                setTreatmentForm((prev) => ({ ...prev, ...localTreatment.treatments[0] }));
            } else {
                console.log("No se encontró el tratamiento");
            }
        };

        localTreatment();
        obtenerSVG();
    }, [svgFile]);

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setTreatmentForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSelectedElementChange = () => {
        setTreatmentForm((prev) => ({
            ...prev,
            partesTocadasDuranteElTratamiento: JSON.stringify(selectedElements.current)
        }));
    };

    const asignarFuncionalidadAElementos = () => {
        const svgElement = svgContainer.querySelector("#elemento-svg");
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
        });
    };

    const handleSubmit = () => {
        let formErrors = {};

        // Validación de campos
        if (!treatmentForm.description) {
            formErrors.description = "Este campo es obligatorio";
        }
        if (!treatmentForm.tratamientoRealizado) {
            formErrors.tratamientoRealizado = "Este campo es obligatorio";
        }
        if (treatmentForm.alergias.length === 0) {
            formErrors.alergias = "Debe agregar al menos una alergia";
        }
        if (treatmentForm.enfermedadesCronicas.length === 0) {
            formErrors.enfermedadesCronicas = "Debe agregar al menos una enfermedad crónica";
        }
        if (treatmentForm.historialQuirurgico.length === 0) {
            formErrors.historialQuirurgico = "Debe agregar al menos un historial quirúrgico";
        }
        if (treatmentForm.enfermedadesHeredoParentales.length === 0) {
            formErrors.enfermedadesHeredoParentales = "Debe agregar al menos una enfermedad hereditaria";
        }

        // Si hay errores, actualizar el estado de errores y detener el envío
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        // Si no hay errores, proceder con la creación o actualización del tratamiento
        if (treatmentForm.id) {
            const treatmentId = treatmentForm.id;
            delete treatmentForm.id;
            delete treatmentForm.appointmentId;
            delete treatmentForm.createdAt;
            delete treatmentForm.updatedAt;

            updateTreatment(treatmentForm, userData.jwt, treatmentId);
        } else {
            createTreatment(treatmentForm, userData.jwt);
        }
        navigate('/mypatients');
    };

    return (
        <>
            <h1>Tratamientos realizados</h1>
            <div className="container">
                <div className="divider" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="speciality" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div id="svgContainer" className="svg-element"></div>
                    </div>
                    <div className="patient-info">
                        <h1>{doctorSpeciality.toUpperCase()}</h1>
                        <div>
                            <label htmlFor="description" className="block text-900 font-medium mb-2 mt-2">
                                Descripción
                            </label>
                            <InputText 
                                className={`col-12 ${errors.description ? 'p-invalid' : ''}`} 
                                id="description" 
                                value={treatmentForm.description} 
                                onChange={(e) => handleInputChange(e, "description")} 
                            />
                            {errors.description && <small className="p-error">{errors.description}</small>}

                            <label htmlFor="tratamientoRealizado" className="block text-900 font-medium mb-2 mt-2">
                                Tratamiento realizado
                            </label>
                            <InputText 
                                className={`col-12 ${errors.tratamientoRealizado ? 'p-invalid' : ''}`} 
                                id="tratamientoRealizado" 
                                value={treatmentForm.tratamientoRealizado} 
                                onChange={(e) => handleInputChange(e, "tratamientoRealizado")} 
                            />
                            {errors.tratamientoRealizado && <small className="p-error">{errors.tratamientoRealizado}</small>}

                            <label htmlFor="alergias" className="block text-900 font-medium mb-2 mt-2">
                                Alergias
                            </label>
                            <div style={{ width: '100%' }} className="chip-size">
                                <Chips 
                                    style={{ width: '100%' }} 
                                    value={treatmentForm.alergias} 
                                    onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["alergias"]: e.value }))} 
                                />
                            </div>
                            {errors.alergias && <small className="p-error">{errors.alergias}</small>}

                            <label htmlFor="enfermedadesCronicas" className="block text-900 font-medium mb-2 mt-2">
                                Enfermedades crónicas
                            </label>
                            <div style={{ width: '100%' }} className="chip-size">
                                <Chips 
                                    style={{ width: '100%' }} 
                                    value={treatmentForm.enfermedadesCronicas} 
                                    onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["enfermedadesCronicas"]: e.value }))} 
                                />
                            </div>
                            {errors.enfermedadesCronicas && <small className="p-error">{errors.enfermedadesCronicas}</small>}

                            <label htmlFor="historialQuirurgico" className="block text-900 font-medium mb-2 mt-2">
                                Historial quirúrgico
                            </label>
                            <div style={{ width: '100%' }} className="chip-size">
                                <Chips 
                                    style={{ width: '100%' }} 
                                    value={treatmentForm.historialQuirurgico} 
                                    onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["historialQuirurgico"]: e.value }))} 
                                />
                            </div>
                            {errors.historialQuirurgico && <small className="p-error">{errors.historialQuirurgico}</small>}

                            <label htmlFor="enfermedadesHeredoParentales" className="block text-900 font-medium mb-2 mt-2">
                                Enfermedades hereditarias
                            </label>
                            <div style={{ width: '100%' }} className="chip-size">
                                <Chips 
                                    style={{ width: '100%' }} 
                                    value={treatmentForm.enfermedadesHeredoParentales} 
                                    onChange={(e) => setTreatmentForm((prev) => ({ ...prev, ["enfermedadesHeredoParentales"]: e.value }))} 
                                />
                            </div>
                            {errors.enfermedadesHeredoParentales && <small className="p-error">{errors.enfermedadesHeredoParentales}</small>}

                            <div className="mt-3">
                            <Button label="Cancelar" onClick={() => navigate('/mypatients')} className="mr-5 btn-info" />
                            <Button label="Guardar" onClick={handleSubmit} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
