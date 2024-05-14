<template>   

<div>
    <Navbar /> <!-- Aquí se incluye la barra de navegación -->
    <!-- Contenido específico del componente Operativo -->
  </div>

    
    
    
    <v-container>
        <h1 class="d-flex justify-center align-center"> Operaciones</h1>
    </v-container>
    
    
    <v-container v-if="esComandante()">
    <v-row>
    
          <v-hover  v-slot="{ isHovering, props }">
            <v-card
              class="mx-auto"
              width="320"
              height="400"
              v-bind="props"
            >
            <v-img src="../../public/crearOperativo.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Crear Operativo
                </h2>
                Crea un nuevo operativo
              </v-card-text>
  
    
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
              <v-btn @click="showCrearOperativoDialog = true" variant="flat">Crear Operativo</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
          <v-hover v-slot="{ isHovering, props }">
            <v-card
            class="mx-auto"
              width="320"
              height="400"
              v-bind="props"
            >
            <v-img src="../../public/listarOperativo.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Listar Operativos
                </h2>
                Muestra un listado de todos los operativos
              </v-card-text>
    
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
              <v-btn color="blue" variant="flat text" @click=" showGetOperativosDialog= true ; verOperativos()">Ver operativos</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
          <v-hover v-slot="{ isHovering, props }">
            <v-card
            class="mx-auto"
              width="320"
              height="400"
              v-bind="props"
            >
            <v-img src="../../public/añadirMisionaOperativo.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Asignar misión a operativo
                </h2>
                Las misiones no se completan solas
              </v-card-text>
    
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
                <v-btn variant="flat" @click="showAñadirMisionOperativo=true; verMisiones(); verOperativos()">Añadir</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-row>
    </v-container>
        <!-- Diálogo para crear operativo -->
        <v-dialog v-model="showCrearOperativoDialog" max-width="600px">
          <v-card>
            <v-card-title>Crear Operativo</v-card-title>
            <v-card-text>
              <!-- Formulario para crear operativo -->
              <v-form @submit.prevent="crearOperativo(name, rol)">
                <v-text-field v-model="name" label="Nombre"></v-text-field>
                <v-text-field v-model="rol" label="Rol"></v-text-field>
                <v-btn type="submit" @click="showCrearOperativoDialog = false;">Crear Operativo</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      <!-- Dialogo para modificar un operitivo -->
      <v-dialog v-model="showModificarOperativoDialog" max-width="600px">
          <v-card>
            <v-card-title>Modificar operativo {{putId}}</v-card-title>
            <v-card-text>
              <!-- Formulario para modificar operativo -->
              <v-form @submit.prevent="modificarOperativo(putId, putName, putRol)">
                <v-text-field v-model="putName" label="name"></v-text-field>
                <v-text-field v-model="putRol" label="rol"></v-text-field>
                <v-btn type="submit" @click="showModificarOperativoDialog = false">Modificar Operativo</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- Dialogo para eliminar un operitivo -->
        <v-dialog v-model="showEliminarOperativoDialog" max-width="600px">
          <v-card>
            <v-card-title>Estás seguro de que quieres eliminar el operativo {{obj.id}}</v-card-title>
            <v-card-text>
              <!-- Formulario para eliminar operativo -->
              <v-form @submit.prevent="eliminarOperativo(obj.id)">
                <p>Nombre del Operativo: {{ obj.name}}</p>
              <p>Rol del Operativo: {{ obj.rol}}</p>
              <p>Misiones del Operativo:</p>
              <ul>
              <li v-for="(mision, misionIndex) in obj.misionAsignada" :key="misionIndex">
        &nbsp;&nbsp;&nbsp;&nbsp;{{ mision.descripcion }} con ID {{ mision.id }}
              </li>
            </ul>
                <v-btn type="submit" @click="showEliminarOperativoDialog = false">Eliminar Operativo</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
              <!-- Diálogo para asignar una mision a un operativo -->
              <v-dialog v-model="showAñadirMisionOperativo" max-width="600px">
          <v-card>
            <v-card-title>Añadir Misión a Operativo</v-card-title>
            <v-card-text>
              <!-- Formulario para asignar una mision a un operativo -->
              <v-form @submit.prevent="añadirMision(opId,misionId)">
                <v-select 
                
        v-model="opId"
        :items="useStoreOperativo().operativos.map(op => op.id)"
        label="Selecciona un Operativo"
      ></v-select>
      <v-select
        v-model="misionId"
        :items="useStoreMision().misiones.map(op => op.id)"
        label="Selecciona una Mision"
      ></v-select>
                <v-btn type="submit" @click="showAñadirMisionOperativo = false; notificacionOperativo=true;">Asignar Misión</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-container>
        <v-row class="my-4">
      <v-col cols="12" md="4">
        <v-text-field v-model="filtroNombre" label="Filtrar por Nombre"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="filtroRol" label="Filtrar por Rol"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn @click="currentPage = 1 ; aplicarFiltros()" color="primary">Aplicar Filtros</v-btn>
        <v-btn @click="currentPage = 1 ; filtroNombre='' ; filtroRol='' ; verOperativos()" class="boton-rojo">Resetear Filtros</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <h1 class="text-h2 text-center my-4">Lista de Operativos</h1>
    <v-divider></v-divider>

    
    <v-row>
      <v-col v-for="(objeto, index) in paginatedOperativos" :key="index" cols="12" md="6">
        <v-card class="my-4">
          <v-card-title>
            <h2 class="text-h6">ID del Operativo: {{ objeto.id }}</h2>
          </v-card-title>

          <v-card-subtitle v-if="esComandante()">
            <v-btn class="boton-azul mr-2" @click="putId = objeto.id; putName = objeto.name; putRol = objeto.rol; showModificarOperativoDialog = true">
              Modificar
            </v-btn>
            
            <v-btn class="boton-rojo" @click="putId = objeto.id; putName = objeto.name; putRol = objeto.rol; showEliminarOperativoDialog = true; obj = objeto; console.log(userRol)">
              Eliminar
            </v-btn>
            <v-btn color="primary" @click="opId = objeto.id; showAñadirMisionOperativo = true; verMisiones();">
              Añadir Misión
            </v-btn>
          </v-card-subtitle>

          <v-card-text>
            <p><strong>Nombre del Operativo:</strong> {{ objeto.name }}</p>
            <p><strong>Rol del Operativo:</strong> {{ objeto.rol }}</p>
            <p><strong>Misiones del Operativo:</strong></p>

            <ul>
              <li v-for="(mision, misionIndex) in objeto.misionAsignada" :key="misionIndex">
                <p>{{ mision.descripcion }} con ID {{ mision.id }}</p>
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
  v-model="currentPage"
  :length="totalPages"
  :items-per-page="6"
  :limit="3"
  @input="updatePage"
  mode="text"
>
</v-pagination>
  </v-container>
  <v-snackbar
        v-model="notificacionOperativo"
        :timeout=3500
      >
        {{ useStoreOperativo().lastStatus }}
  
        <template v-slot:actions>
          <v-btn
            color="blue"
            variant="text"
            @click="notificacionOperativo = false"
          >
            X
          </v-btn>
        </template>
      </v-snackbar>
      
  
      
      </template>
      
      <script setup>
      import { onMounted, computed } from 'vue';
      import { ref } from 'vue';
      import Navbar from '@/components/NavBarComponent.vue';
      import { useStoreOperativo } from '@/store/storeOperativos';
      import { useStoreMision } from '@/store/storeMisiones';





onMounted(() => {
        userRol.value = localStorage.getItem('role') || '';
        console.log(userRol.value);
  verOperativos();
});
      const userRol = ref('');
      const showCrearOperativoDialog = ref(false);
      const showGetOperativosDialog = ref(false);
      const showAñadirMisionOperativo = ref(false);
      const showModificarOperativoDialog = ref(false);
      const showEliminarOperativoDialog = ref(false);
      const notificacionOperativo = ref(false);
      const name = ref('');
      const rol = ref('');
      
      const opId = ref(0);
      const misionId = ref(0);
      
      const putId = ref(0);
      const putName = ref('');
      
      const filtroNombre = ref('');
      const filtroRol = ref('');
      
      const { verOperativos } = useStoreOperativo();
      const { verMisiones } = useStoreMision();
      const { crearOperativo } = useStoreOperativo();
      const { añadirMision } = useStoreOperativo();
      const { modificarOperativo } = useStoreOperativo();
      const { eliminarOperativo } = useStoreOperativo();



      
      const perPage = 6 // Número de elementos por página
      const currentPage = ref(1); // Página actual
      function esComandante() {
  return userRol.value === "Comandante";
}
      const totalPages = computed(() => {
        // Calcula el número total de páginas
        return Math.ceil(useStoreOperativo().operativos.length / perPage);
      });
      
      const paginatedOperativos = computed(() => {
        // Utiliza slice para mostrar solo los elementos de la página actual
        const startIndex = (currentPage.value - 1) * perPage;
        const endIndex = startIndex + perPage;
        return useStoreOperativo().operativos.slice(startIndex, endIndex);
      });
      
      const updatePage = (page) => {
        // Actualiza la página actual al cambiar la paginación
        currentPage.value = page;
      };
      
      const aplicarFiltros = () => {
        // Filtrar la lista de operativos según los filtros
        const operativosFiltrados = useStoreOperativo().operativos.filter((operativo) => {
          const cumpleFiltroNombre = operativo.name.toLowerCase().includes(filtroNombre.value.toLowerCase());
          const cumpleFiltroRol = operativo.rol.toLowerCase().includes(filtroRol.value.toLowerCase());
      
          return cumpleFiltroNombre && cumpleFiltroRol;
        });
      
        // Actualizar la lista de operativos con la lista filtrada
        useStoreOperativo().operativos = operativosFiltrados;
      };
      
      </script>
      
      <style>
      @import "@/styles/styles.css"
      </style>