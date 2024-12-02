import { Button } from 'primereact/button'
import React from 'react'
import Imagen from '../assets/medico-home.png'
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleDirectorioClick = () => {
        navigate('/directorio');
    };

    const handleLoginClick = () => {
        navigate('/login')
    }

  return (
    <>
        <div className="grid grid-nogutter surface-0 text-800">
            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                <section>
                    
                <span className="block text-6xl font-bold mb-1">Cuidamos de tu salud</span>
                    <div className="text-6xl text-primary font-bold mb-3">Atención médica de calidad para ti y tu familia</div>
                    <p className="mt-0 mb-4 text-700 line-height-3">
                        En nuestra clínica, contamos con un equipo de profesionales altamente capacitados y la tecnología más avanzada para brindarte el mejor servicio médico. 
                        ¡Tu bienestar es nuestra prioridad!
                    </p>

                    <Button label="Acceso a pacientes" type="button" className="mr-3 p-button-raised" onClick={handleLoginClick} />
                    <Button label="Directorio" type="button" className="p-button-outlined" onClick={handleDirectorioClick} />
                </section>
            </div>
            <div className="col-12 md:col-6 overflow-hidden">
                <img src={Imagen} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
            </div>
        </div>
    </>
  )
}
