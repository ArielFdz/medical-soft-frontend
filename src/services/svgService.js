export const getSVG = async (especialidad) => {
    try {
        const response = await fetch(`${especialidad}.svg`);
        return response.text();
    } catch (error) {
        console.log("No se pudo obtener el svg, error:", error);
        throw error;
    }
}