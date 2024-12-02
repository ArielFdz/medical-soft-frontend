import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import ReusableConfirmDialog from '../components/ReusableConfirmDialog'

export const Login = () => {

    const [dialogVisible, setDialogVisible] = useState(false);

    const handleConfirm = () => {
        console.log("Confirmado!");
        setDialogVisible(false);
    };

    const handleCancel = () => {
        console.log("Cancelado!");
        setDialogVisible(false);
    };

  return (
    <>
    
<div className="flex align-items-center justify-content-center">
    <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
            <img src={Logo} alt="hyper" height={100} className="mb-3" />
            <div className="text-900 text-3xl font-medium mb-3">Bienvenido(a)</div>
        </div>

        <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
            <InputText id="email" type="text" placeholder="Email address" className="w-full mb-3" />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" />
            
            <Button label="Iniciar sesión" icon="pi pi-user" className="w-full" onClick={() => setDialogVisible(true)} />
            <ReusableConfirmDialog
                visible={dialogVisible}
                message="¿Estás seguro de que deseas iniciar sesión?"
                header="Confirmación de inicio de sesión"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    </div>
</div>
    
    </>
  )
}