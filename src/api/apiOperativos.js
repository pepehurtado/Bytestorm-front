// Llama a la función para iniciar la solicitud

export async function getOperativos() {
  const url = 'https://localhost:7260/api/Operativo';

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

export async function getOperativo(id) {
  const url = `https://localhost:7260/api/Operativo/${id}`;

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

export async function createOperativo(nombre, rolAsig) {
  const url = 'https://localhost:7260/api/Operativo';
  const authToken = localStorage.getItem('authToken');
  console.log(authToken);
  const data = {
    name: nombre,
    rol: rolAsig,
  };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, options);

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

export async function addMisionToOperativo(id, idMision) {
  const url = `https://localhost:7260/api/Operativo/${id}?idMision=${idMision}`;
  const authToken = localStorage.getItem('authToken');
  const data = {
  };

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error:', errorText);
      return errorText;
      //throw new Error(`HTTP error! Statusssssssss: ${response.status}`);
    }

    const responseText = await response.text();
    await console.log('Response:', responseText);
    return "OK";
    // Puedes realizar acciones con la respuesta aquí
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function putOperativo(id,nombre, rolAsig) {
  const url = `https://localhost:7260/api/Operativo/${id}`;
  const authToken = localStorage.getItem('authToken');
  const data = {
    name: nombre,
    rol: rolAsig,
  };

  const options = {
    method: 'PUT',
    headers: {
      'Accept': 'text/plain',
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    console.log(options);
    const response = await fetch(url, options);

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

export async function deleteOperativo(id) {
  const url = `https://localhost:7260/api/Operativo/${id}`;
  const authToken = localStorage.getItem('authToken');
  const options = {
    method: 'DELETE',
    headers: {
      'Accept': 'text/plain',
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await fetch(url, options);

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