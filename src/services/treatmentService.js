export const createTreatment = async (treatment, jwt) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/treatments`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(treatment),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }

    const data = await response.json();
    return data;
}

export const updateTreatment = async (treatment, jwt, id) => {
    console.log(treatment);

    const response = await fetch(`${import.meta.env.VITE_URL_API}/treatments/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify(treatment),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }

    const data = await response.json();
    return data;
}

export const getTreatment = async (jwt, id) => {
    const response = await fetch(`${import.meta.env.VITE_URL_API}/treatments?idAppoinment=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${jwt}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la solicitud');
    }

    const data = await response.json();
    return data;
}
