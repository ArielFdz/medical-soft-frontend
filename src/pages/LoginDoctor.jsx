import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'

export const LoginDoctor = () => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

  return (
    <>
    
<div className="flex align-items-center justify-content-center">
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <img src={Logo} alt="hyper" height={100} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Bienvenido(a)</div>
            <span className="text-600 font-medium line-height-3">¿Todavía no tienes una cuenta?</span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={handleRegisterClick}>Crear cuenta</a>
        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />
            
            <Button label="Iniciar sesión" icon="pi pi-user" className="w-full" />
        </div>
    </div>
</div>
    
    </>
  )
}