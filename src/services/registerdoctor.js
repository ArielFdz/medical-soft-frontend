export const registerdoctor = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/auth/register`, {
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
        return data;
    } catch (error) {
        console.error('Error al registrar al doctor:', error);
        throw error;
    }
};
