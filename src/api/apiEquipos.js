
export async function getEquipos() {
  const url = 'https://localhost:7260/api/Equipo';

  // Recuperar el token del almacenamiento local
  
  const authToken = localStorage.getItem('authToken');
  console.log(authToken);

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'text/plain',
      'Authorization': `Bearer ${authToken}`, // Agrega el token de autorización
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseJson = await response.json();
    return responseJson;
    // Puedes realizar acciones con la respuesta aquí
  } catch (error) {
    console.error('Error:', error);
  }
}


  export async function createEquipo(tipoEquipo, descrip, estado) {
    const url = 'https://localhost:7260/api/Equipo';

    const data = {
      tipoEquipoDTO: tipoEquipo,
        descripcion: descrip,
        estadoEquipoDTO: estado,
        misionId: null
    };

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',  // Cambiado a 'application/json'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            // Mejorando el mensaje de error para incluir detalles del estado
            throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
        }
        // Puedes realizar acciones con la respuesta aquí
    } catch (error) {
        console.error("Error:", error);
    }
}
