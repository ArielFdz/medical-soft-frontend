const BASE_URL = import.meta.env.VITE_URL_API;

export const fetchDoctorsBySpecialtyAndUser = async (specialty,email) => {
    try {
        console.log(email)
        const response = await fetch(`${BASE_URL}/patient-doctors/mydoctors?specialty=${encodeURIComponent(specialty)}&email=${encodeURIComponent(email)}`);
        if (!response.ok) {
            throw new Error(`Error al obtener datos para la especialidad ${specialty}`);
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
