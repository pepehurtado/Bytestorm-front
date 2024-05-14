<template>
  <v-app-bar
    app
    color="primary"
    dark
    scroll-behavior="elevate fade-image"
    scroll-threshold="300"
    image="./lluviabits.jpeg"
    flat
  >


    <v-spacer></v-spacer>
    
    <router-link
      to="/menu"
      class="nav-link menu"
      :class="{ active: isRouteActive('/menu') }"
    >
      Inicio
    </router-link>
    <router-link
      to="/operativo"
      class="nav-link operativo"
      :class="{ active: isRouteActive('/operativo') }"
    >
      Operativo
    </router-link>
    <router-link
      to="/mision"
      class="nav-link mision"
      :class="{ active: isRouteActive('/mision') }"
    >
      Mision
    </router-link>
    <router-link
      to="/equipo"
      class="nav-link equipo"
      :class="{ active: isRouteActive('/equipo') }"
    >
      Equipo
    </router-link>

    <v-spacer></v-spacer>





    <v-menu v-model="menu" :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <v-btn class = "perfil-button" v-bind="props">{{ userName }}</v-btn>
      </template>

      <v-card min-width="300">
        <!-- Agrega el contenido de la nueva estructura aquí -->
        <v-list>
  <v-list-item
    prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
  >
    <v-list-item-content>
      <v-list-item-title>{{ userFullname }}({{ userRole }})</v-list-item-title>
      <v-list-item-subtitle>{{ userCorreo }}</v-list-item-subtitle>
    </v-list-item-content>
    <template v-slot:append>
      <v-btn
        variant="text"
        :class="fav ? 'text-red' : ''"
        icon="mdi-heart"
        @click="fav = !fav"
      ></v-btn>
    </template>
  </v-list-item>
</v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Habilitar mensajes"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Habilitar sugerencias"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" @click="menu = false">Cancelar</v-btn>
          <v-btn @click="logout" color="primary" variant="text" >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

      


  </v-app-bar>
</template>

<script>
export default {
  data() {
    
    return {
      fav: true,
    menu: false,
    message: false,
    hints: true,
      userRole: '',
      userName: '',
      userFullname: '',
      userCorreo: ''
    };
  },
  mounted() {
    // Obtener el rol y el nombre del usuario desde localStorage
    this.userRole = localStorage.getItem('role') || '';
    this.userName = localStorage.getItem('username') || '';
    this.userFullname = localStorage.getItem('fullname') || '';
    this.userCorreo = localStorage.getItem('correo') || '';
  },
  methods: {
    logout() {
      // Implementa la lógica para cerrar sesión
      // Por ejemplo, puedes limpiar el localStorage y redirigir a la página de inicio de sesión
      localStorage.clear();
      this.$router.push('/login')},
    toggleDrawer() {
      // Implementa la lógica para mostrar o ocultar el cajón lateral (drawer)
    },
    like() {
      // Implementa la lógica para la acción de "Me gusta"
    },
    search() {
      // Implementa la lógica para la acción de búsqueda
    },
    showMenu() {
      // Implementa la lógica para mostrar un menú
    },
    isRouteActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para los botones de navegación */
.nav-link.operativo,
.nav-link.menu,
.nav-link.mision,
.nav-link.equipo {
  background-color: black;
  color: white;
  padding: 10px;
  margin: 0 10px;
  transition: color 0.3s;
  text-decoration: none;
  border-radius: 10px;
}

.perfil-button:hover{
  background-color: rgb(29, 172, 228);
}

.perfil-button{
  background-color: black;
}

.nav-link.operativo:hover,
.nav-link.mision:hover,
.nav-link.equipo:hover {
  color: blue !important;
}

/* Estilos cuando el botón está activo */
.nav-link.operativo.active,
.nav-link.mision.active,
.nav-link.equipo.active,
.nav-link.menu.active{
  color: blue !important;
  background-color: white !important;
}
</style>
