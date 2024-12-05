import React from 'react'
import { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { Dropdown } from '../components/Dropdown';
import Logo from '../assets/logo.png';
import { registerdoctor } from '../services/registerdoctor';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    specialty: null,
    consultationFee: null,
    dateOfBirth: null,
    phone: null,
    professionalId: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const toast = React.useRef(null);

  const items = [
    { name: 'Odontólogo', val: 'odontologo' },
    { name: 'Gastroenterólogo', val: 'gastroenterologo' },
    { name: 'Cardiólogo', val: 'cardiologo' }
  ];

  const consultorios = [
    { name: 'Consultorio A1', val: 'C1' },
    { name: 'Consultorio A2', val: 'C2' },
    { name: 'Consultorio A3', val: 'C3' },
    { name: 'Consultorio A4', val: 'C4' },
    { name: 'Consultorio A5', val: 'C5' },
    { name: 'Consultorio A6', val: 'C6' },
    { name: 'Consultorio A7', val: 'C7' },
    { name: 'Consultorio A8', val: 'C8' },
    { name: 'Consultorio A9', val: 'C9' },
    { name: 'Consultorio A10', val: 'C10' }
  ];

  const handleInputChange = (e, field) => {
    const value = e.target?.value || e.value || null;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'El nombre es obligatorio.';
    if (!form.specialty) newErrors.specialty = 'La especialidad es obligatoria.';
    if (!form.consultationFee) newErrors.consultationFee = 'El consultorio es obligatorio.';
    if (!form.dateOfBirth) newErrors.dateOfBirth = 'La fecha de nacimiento es obligatoria.';
    if (!form.phone) newErrors.phone = 'El número de teléfono es obligatorio.';
    if (!form.professionalId) newErrors.professionalId = 'La cédula profesional es obligatoria.';
    if (!form.email) newErrors.email = 'El correo electrónico es obligatorio.';
    if (!form.password) newErrors.password = 'La contraseña es obligatoria.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await registerdoctor(form);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso.' });
        navigate('/login-doctor');
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo completar el registro.' });
        console.error('Error al enviar los datos:', error);
      }
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Por favor completa todos los campos.' });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-items-center justify-content-center">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <div className="text-center mb-5">
            <img src={Logo} alt="logo" height={100} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Bienvenido(a)</div>
          </div>

          <div>
            <label htmlFor="name" className="block text-900 font-medium mb-2">Nombre(s)</label>
            <InputText
              id="name"
              value={form.name}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Nombres y apellidos"
              className={`w-full mb-3 ${errors.name ? 'p-invalid' : ''}`}
            />
            {errors.name && <small className="p-error">{errors.name}</small>}

            <label htmlFor="specialty" className="block text-900 font-medium mb-2">Especialidad</label>
            <Dropdown
              id="specialty"
              items={items}
              value={form.specialty}
              onChange={(e) => handleInputChange(e, 'specialty')}
              classError={errors.specialty ? 'p-invalid' : ''}
            />
            {errors.specialty && <small className="p-error">{errors.specialty}</small>}

            <label htmlFor="consultationFee" className="block text-900 font-medium mb-2">Consultorio</label>
            <Dropdown
              id="consultationFee"
              items={consultorios}
              value={form.consultationFee}
              onChange={(e) => handleInputChange(e, 'consultationFee')}
              classError={errors.specialty ? 'p-invalid' : ''}
            />
            {errors.consultationFee && <small className="p-error">{errors.consultationFee}</small>}

            <label htmlFor="dateOfBirth" className="block text-900 font-medium mb-2">Fecha de nacimiento</label>
            <Calendar
              id="dateOfBirth"
              value={form.dateOfBirth}
              onChange={(e) => handleInputChange(e, 'dateOfBirth')}
              placeholder="Fecha de nacimiento"
              className={`w-full mb-3 ${errors.dateOfBirth ? 'p-invalid' : ''}`}
            />
            {errors.dateOfBirth && <small className="p-error">{errors.dateOfBirth}</small>}

            <label htmlFor="phone" className="block text-900 font-medium mb-2">Teléfono</label>
            <InputText
              id="phone"
              value={form.phone}
              onChange={(e) => handleInputChange(e, 'phone')}
              placeholder="Número de teléfono"
              className={`w-full mb-3 ${errors.phone ? 'p-invalid' : ''}`}
            />
            {errors.phone && <small className="p-error">{errors.phone}</small>}

            <label htmlFor="professionalId" className="block text-900 font-medium mb-2">Cédula profesional</label>
            <InputText
              type='text'
              id="professionalId"
              value={form.professionalId}
              onChange={(e) => handleInputChange(e, 'professionalId')}
              placeholder="Cédula profesional"
              className={`w-full mb-3 ${errors.professionalId ? 'p-invalid' : ''}`}
            />
            {errors.professionalId && <small className="p-error">{errors.professionalId}</small>}

            <label htmlFor="email" className="block text-900 font-medium mb-2">Correo electrónico</label>
            <InputText
              id="email"
              value={form.email}
              onChange={(e) => handleInputChange(e, 'email')}
              type="email"
              placeholder="Dirección de correo electrónico"
              className={`w-full mb-3 ${errors.email ? 'p-invalid' : ''}`}
            />
            {errors.email && <small className="p-error">{errors.email}</small>}

            <label htmlFor="password" className="block text-900 font-medium mb-2">Contraseña</label>
            <InputText
              id="password"
              value={form.password}
              onChange={(e) => handleInputChange(e, 'password')}
              type="password"
              placeholder="Contraseña"
              className={`w-full mb-3 ${errors.password ? 'p-invalid' : ''}`}
            />
            {errors.password && <small className="p-error">{errors.password}</small>}

            <Button label="Crear cuenta" icon="pi pi-user" className="w-full" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};
