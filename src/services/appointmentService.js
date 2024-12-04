const BASE_URL = import.meta.env.VITE_URL_API;

export const postAppointment = async (formData, jwt) => {
    try {
        const response = await fetch(`${BASE_URL}/appointments`, {
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
        console.error('Error al registrar la cita:', error.message);
        throw error;
    }
};

export const getAppointments = async (jwt, status) => {

    try {
        const response = await fetch(`${BASE_URL}/appointments?status=${status}`, {
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

export const putAppointment = async (formData, jwt, id) => {
    try {
        const response = await fetch(`${BASE_URL}/appointments/${id}`, {
            method: 'PUT',
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
        console.error('Error al registrar la cita:', error.message);
        throw error;
    }
};