import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from '../components/Dropdown';
import { registerPatient } from "../services/patientService";
import { Toast } from "primereact/toast";
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';

export default function ModalPatient({ visible, setVisible }) {
    const {userData} = useDataDoctoresStore();
    const toast = React.useRef(null);

    const tipoSangre = [
        { name: 'A+', val: 'A+' },
        { name: 'A-', val: 'A-' },
        { name: 'B+', val: 'B+' },
        { name: 'B-', val: 'B-' },
        { name: 'AB+', val: 'AB+' },
        { name: 'AB-', val: 'AB-' },
        { name: 'O+', val: 'O+' },
        { name: 'O-', val: 'O-' }
    ];

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        personalNumber: '',
        emergencyNumber: '',
        dateOfBirth: null,
        bloodType: '',
        allergy: ''
    });

    const [errors, setErrors] = useState({});
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // Confirmation dialog state

    const validateForm = () => {
        const newErrors = {};

        if (!formValues.name) newErrors.name = 'El nombre es obligatorio.';
        if (!formValues.email) newErrors.email = 'El correo electrónico es obligatorio.';
        if (!formValues.personalNumber) newErrors.personalNumber = 'El número de teléfono es obligatorio.';
        if (!formValues.emergencyNumber) newErrors.emergencyNumber = 'El número de emergencia es obligatorio.';
        if (!formValues.dateOfBirth) newErrors.dateOfBirth = 'La fecha de nacimiento es obligatoria.';
        if (!formValues.bloodType) newErrors.bloodType = 'El tipo de sangre es obligatorio.';
        if (!formValues.allergy) newErrors.allergy = 'Las alergias son obligatorias.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setShowConfirmDialog(true); // Show confirmation dialog when form is valid
        }
    };

    const handleConfirmAdd = async () => {
        try {
            await registerPatient(formValues, userData.jwt);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso.' });
            setVisible(false);
            setFormValues({ 
                name: '',
                email: '',
                personalNumber: '',
                emergencyNumber: '',
                dateOfBirth: null,
                bloodType: '',
                allergy: ''
            });
            setShowConfirmDialog(false); // Close confirmation dialog
        } catch (error) {
            setShowConfirmDialog(false); 
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo completar el registro. Valide los campos.' });
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
    };

    const handleDateChange = (e) => {
        setFormValues((prevValues) => ({ ...prevValues, dateOfBirth: e.value }));
    };

    const handleDropdownChange = (e) => {
        setFormValues((prevValues) => ({ ...prevValues, bloodType: e.value }));
    };

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Agregar" icon="pi pi-check" onClick={handleSubmit} autoFocus />
        </div>
    );

    const confirmFooter = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setShowConfirmDialog(false)} className="p-button-text" />
            <Button label="Confirmar" icon="pi pi-check" onClick={handleConfirmAdd} autoFocus />
        </div>
    );

    return (
        <>
        <Toast ref={toast} />
        <Dialog header="Agregar paciente" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
            <label htmlFor="name" className="block text-900 font-medium mb-2">Nombre(s)</label>
            <InputText
                id="name"
                placeholder="Nombres y apellidos"
                className={`w-full mb-3 ${errors.name ? 'p-invalid' : ''}`}
                value={formValues.name}
                onChange={handleInputChange}
            />
            {errors.name && <small className="p-error">{errors.name}</small>}

            <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electrónico</label>
            <InputText
                id="email"
                type="email"
                placeholder="Dirección de correo electrónico"
                className={`w-full mb-3 ${errors.email ? 'p-invalid' : ''}`}
                value={formValues.email}
                onChange={handleInputChange}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}

            <label htmlFor="personalNumber" className="block text-900 font-medium mb-2">Teléfono</label>
            <InputText
                id="personalNumber"
                placeholder="Número de contacto"
                className={`w-full mb-3 ${errors.personalNumber ? 'p-invalid' : ''}`}
                value={formValues.personalNumber}
                onChange={handleInputChange}
            />
            {errors.personalNumber && <small className="p-error">{errors.personalNumber}</small>}

            <label htmlFor="emergencyNumber" className="block text-900 font-medium mb-2">Teléfono de emergencia</label>
            <InputText
                id="emergencyNumber"
                placeholder="Número de contacto"
                className={`w-full mb-3 ${errors.emergencyNumber ? 'p-invalid' : ''}`}
                value={formValues.emergencyNumber}
                onChange={handleInputChange}
            />
            {errors.emergencyNumber && <small className="p-error">{errors.emergencyNumber}</small>}

            <label htmlFor="dateOfBirth" className="block text-900 font-medium mb-2">Fecha de nacimiento</label>
            <Calendar
                id="dateOfBirth"
                placeholder="Fecha de nacimiento"
                className={`w-full mb-3 ${errors.dateOfBirth ? 'p-invalid' : ''}`}
                value={formValues.dateOfBirth}
                onChange={handleDateChange}
            />
            {errors.dateOfBirth && <small className="p-error">{errors.dateOfBirth}</small>}

            <label htmlFor="bloodType" className="block text-900 font-medium mb-2">Tipo de sangre</label>
            <Dropdown
                id="bloodType"
                items={tipoSangre}
                onChange={handleDropdownChange}
                classError={errors.bloodType ? 'p-invalid' : ''}
            />
            {errors.bloodType && <small className="p-error">{errors.bloodType}</small>}

            <label htmlFor="allergy" className="block text-900 font-medium mb-2">Alergias</label>
            <InputText
                id="allergy"
                placeholder="Alergias conocidas"
                className={`w-full mb-3 ${errors.allergy ? 'p-invalid' : ''}`}
                value={formValues.allergy}
                onChange={handleInputChange}
            />
            {errors.allergy && <small className="p-error">{errors.allergy}</small>}
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog 
            header="Confirmación" 
            visible={showConfirmDialog} 
            style={{ width: '30vw' }} 
            onHide={() => setShowConfirmDialog(false)} 
            footer={confirmFooter}
        >
            <p>¿Estás seguro de que deseas agregar este paciente?</p>
        </Dialog>
        </>
    );
}
