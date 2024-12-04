export const loginPatient = async (formData) => {
    

    try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/patients/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error al iniciar sesión como paciente:', error);
        throw error;
    }
};
