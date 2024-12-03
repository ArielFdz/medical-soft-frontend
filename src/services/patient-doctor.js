const BASE_URL = import.meta.env.VITE_URL_API;

export const asignPatientToDoctor = async (formData, jwt) => {
    try {
        const response = await fetch(`${BASE_URL}/patient-doctors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la solicitud');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al registrar al paciente:', error.message);
        throw error;
    }
};
