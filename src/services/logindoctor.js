export const logindoctor = async (formData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/auth/login`, {
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
        console.error('Error al iniciar sesión como doctor:', error);
        throw error;
    }
};
