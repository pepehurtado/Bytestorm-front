<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn type="submit" color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        // Realizar la solicitud POST utilizando fetch
        const response = await fetch('https://localhost:7260/api/LoginController', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: this.username,
            password: this.password,
          }),
        });

        if (!response.ok) {
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parsear la respuesta JSON
        const token = await response.json();
        localStorage.setItem('authToken', token);

// Almacena el token en el almacenamiento local
localStorage.setItem('authToken', token);



// Divide el token en sus tres partes (encabezado, reclamaciones y firma)
const [, claimsBase64] = token.split('.');

// Decodifica las partes base64 y analiza como JSON
const decodedClaims = JSON.parse(decodeURIComponent(atob(claimsBase64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));

// Accede a los claims específicos
const roleClaim = decodedClaims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
const nameIdentifierClaim = decodedClaims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
const fullnameClaim = decodedClaims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]; // Claim para el nombre completo
const correoClaim = decodedClaims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]; // Claim para el correo

// Ahora puedes utilizar los valores de los claims
// Almacena el token en el almacenamiento local
localStorage.setItem('role', roleClaim);
localStorage.setItem('username', nameIdentifierClaim);
localStorage.setItem('fullname', fullnameClaim);
localStorage.setItem('correo', correoClaim);
console.log(fullnameClaim, correoClaim);


        // Si la autenticación es exitosa, redirigir a la página MenuBS
        this.$router.push('/menu');
      } catch (error) {
        // Manejar errores, por ejemplo, mostrar un mensaje de error
        console.error('Error en la autenticación:', error.message);
      }
    },
  },
};
</script>

<style>
/* Agrega estilos personalizados aquí si es necesario */
</style>
