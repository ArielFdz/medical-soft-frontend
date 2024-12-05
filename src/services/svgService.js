export const getSVG = async (especialidad) => {
    try {
        const response = await fetch(`especialidades/${especialidad}.svg`);
        return response.text();
    } catch (error) {
        console.log("No se pudo obtener el svg, error:", error);
        throw error;
    }
}