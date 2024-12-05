import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast';
import React, { useState, useRef } from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { logindoctor } from '../services/logindoctor'
import { useDataDoctoresStore } from '../store/useDataDoctoresStore';

import { Calendar } from 'primereact/calendar';
import { loginPatient } from '../services/loginPatient';
import { useDataPatientsStore } from '../store/useDataPatientsStore';
        
export const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', dateOfBirth: '' });
    const [errors, setErrors] = useState({});
    const toast = useRef(null);
    const {userData, setUserData} = useDataPatientsStore();
    const [date, setDate] = useState(null);
    const handleRegisterClick = () => {
        navigate('/register');
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email.trim()) {
            newErrors.email = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Formato de correo no válido';
        }
        console.log(form)
        if (dateOfBirth==='') {
            newErrors.dateOfBirth = 'Debe seleccionar un fecha';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const result = await loginPatient(form);
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso.' });
                console.log('Inicio de sesión exitoso:', result);
                setUserData(result.patientRecord);
                //navigate('/');
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Credenciales incorrectas.' });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos.' });
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [id]: value }));
    };

    return (
        <>
            <Toast ref={toast} />
            <div className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <img src={Logo} alt="hyper" height={100} className="mb-3" />
                        <div className="text-900 text-3xl font-medium mb-3">Bienvenido(a)</div>
                    
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText
                            id="email"
                            type="text"
                            placeholder="Email address"
                            className={`w-full mb-3 ${errors.email ? 'p-invalid' : ''}`}
                            value={form.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <small className="p-error">{errors.email}</small>}

                        <label htmlFor="dateOfBirth" className="block text-900 font-medium mb-2">Fecha de nacimiento</label>
                        <Calendar placeholder='Fecha de nacimiento'  className={`w-full mb-3 ${errors.email ? 'p-invalid' : ''}`} id='dateOfBirth' value={date}  onChange={handleInputChange} />
                        {errors.dateOfBirth && <small className="p-error">{errors.dateOfBirth}</small>}

                        <Button label="Iniciar sesión" icon="pi pi-user" className="w-full" onClick={handleSubmit} />
                    </div>
                </div>
            </div>

        </>
    )
}