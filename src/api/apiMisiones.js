// Llama a la función para iniciar la solicitud

export async function getMisiones() {
    const url = 'https://localhost:7260/api/Mision';
  
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
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

  export async function createMision(descr, estM) {
    const url = 'https://localhost:7260/api/Mision';

    const data = {
        descripcion: descr,
        estadoMision: estM,
        opId: null
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

export async function addEquipoToMision(id, idEquipo) {
  const url = `https://localhost:7260/api/Mision/${id}?idEquipo=${idEquipo}`;

  const data = {
  };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log('Response:', responseText);
    // Puedes realizar acciones con la respuesta aquí
  } catch (error) {
    console.error('Error:', error);
  }
}