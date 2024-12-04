const BASE_URL = import.meta.env.VITE_URL_API;

async function getFilesId(id) {
  
    const url = `${BASE_URL}/files?idAppoinment${id}`;
  
    try {
      const response = await fetch(url);
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Parsear la respuesta como JSON
      const data = await response.json();
  
      return data; // Devolver los datos obtenidos
    } catch (error) {
      console.error('Hubo un problema con la petición GET:', error.message);
      throw error; // Relanzar el error para manejarlo en otro lugar si es necesario
    }
  }
  