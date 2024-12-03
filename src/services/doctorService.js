const BASE_URL = import.meta.env.VITE_URL_API;

export const fetchDoctorsBySpecialty = async (specialty) => {
    try {
        const response = await fetch(`${BASE_URL}/doctors?specialty=${encodeURIComponent(specialty)}`);
        if (!response.ok) {
            throw new Error(`Error al obtener datos para la especialidad ${specialty}`);
        }
        const data = await response.json();
        return data.doctorRecords;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
