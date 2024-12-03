const BASE_URL = import.meta.env.VITE_URL_API;

export const registerPatient = async (formData, jwt) => {
    
    try {
        const response = await fetch(`${BASE_URL}/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al registrar al paciente:', error);
        throw error;
    }
};

export const getPatients = async (jwt) => {
    
    try {
        const response = await fetch(`${BASE_URL}/patients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al solicitar el listado de pacientes:', error);
        throw error;
    }
};