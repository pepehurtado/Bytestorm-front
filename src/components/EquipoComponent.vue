<template>   
    <div>
      <Navbar /> <!-- Aquí se incluye la barra de navegación -->
      <!-- Contenido específico del componente Operativo -->
    </div>
    
    
    <v-container>
        <h1 class="d-flex justify-center align-center"> Operaciones</h1>
    </v-container>
    
    
    <v-container>
    <v-row>
          
          <v-hover v-slot="{ isHovering, props }">
            <v-card
            class="mx-auto"
              width="320"
              height="400"
              v-bind="props"
            >
            <v-img src="../../public/crearEquipo.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Crear Equipo
                </h2>
                Crea un nuevo Equipo
              </v-card-text>
    
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
              <v-btn @click="showCrearEquipoDialog = true" variant="flat">Crear Equipo</v-btn>
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
            <v-img src="../../public/listarEquipos.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Listar equipos
                </h2>
                Muestra un listado de todos las equipos
              </v-card-text>
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
              <v-btn variant="flat" @click=" showGetEquiposDialog= true ; verEquipos()">Ver equipos</v-btn>
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
            <v-img src="../../public/añadirEquipoaMision.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Asignar equipo a misión
                </h2>
                Necesitamos material para continuar
              </v-card-text>
    
  
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
                <v-btn variant="flat" @click=" showAñadirEquipoMision=true; verMisiones(); verEquipos()">Añadir</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-row>
        </v-container>
          <!-- Diálogo para listar equipos -->
          <v-dialog v-model="showGetEquiposDialog" max-width="600px">
      <v-card>
        <v-card-title>Lista de Equipos</v-card-title>
        <v-card-text>
          <ul>
            <li v-for="(objeto, index) in useStoreEquipo().equipos" :key="index">
              <p>ID del equipo: {{ objeto.id}}</p>
              <p>Descripción del equipo: {{ objeto.descripcion}}</p>
              <p>Tipo del equipo: {{ objeto.tipoEquipo}}</p>
              <p>Estado del equipo: {{ objeto.estadoEquipo}}</p>
              <p>Mision del equipo: {{ objeto.misionId}}</p>
            </li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <!-- Botón para cerrar el diálogo -->
          <v-btn @click="showGetEquiposDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <!-- Diálogo para añadir equipo -->
        <v-dialog v-model="showCrearEquipoDialog" max-width="600px">
          <v-card>
            <v-card-title>Crear Equipo</v-card-title>
            <v-card-text>
              <!-- Formulario para crear equipo -->
              <v-form @submit.prevent="crearEquipo(tipoEquipo, descrip, estadoEquipo)">
                <v-text-field v-model="descrip" label="Descripción"></v-text-field>
                <v-combobox
                 v-model="estadoEquipo"
                 label="Estado del equipo"
                 :items="['Disponible', 'En Uso']"
        ></v-combobox>
        <v-combobox
                 v-model="tipoEquipo"
                 label="Tipo del equipo"
                 :items="['Hardware', 'Software']"
        ></v-combobox>
                <v-btn type="submit" @click="showCrearEquipoDialog = false;">Crear Equipo</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
              
        <!-- Diálogo para asignar un equipo a una misión -->
      <v-dialog v-model="showAñadirEquipoMision" max-width="600px">
          <v-card>
            <v-card-title>Añadir Equipo a Misión</v-card-title>
            <v-card-text>
              <!-- Formulario para asignar una mision a un operativo -->
              <v-form @submit.prevent="añadirEquipo(misId,eqId)">
                <v-select
        v-model="misId"
        :items="useStoreMision().misiones.map(mis => mis.id)"
        label="Selecciona una Mision"
      ></v-select>
      <v-select
        v-model="eqId"
        :items="useStoreEquipo().equipos.map(op => op.id)"
        label="Selecciona un Equipo"
      ></v-select>
                <v-btn type="submit" @click="showAñadirEquipoMision = false">Asignar Equipo</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
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
      import Navbar from '@/components/NavBarComponent.vue';
      import { ref } from 'vue';
      import { useStoreOperativo } from '@/store/storeOperativos';
      import { useStoreMision } from '@/store/storeMisiones';
      import { useStoreEquipo } from '@/store/storeEquipo';
  

      const showGetEquiposDialog = ref(false);
      const showCrearEquipoDialog = ref(false);
      const showAñadirEquipoMision = ref(false);
      const notificacionOperativo = ref(false);

      const tipoEquipo = ref('');
      const descrip = ref('');
      const estadoEquipo = ref('');
  

  
  
      const misId = ref(0);
      const eqId = ref(0);
      //const { verMisiones } = useStoreMision();
      const {verEquipos} = useStoreEquipo();
      const {crearEquipo} = useStoreEquipo();
      const {añadirEquipo} = useStoreMision();

  
      </script>
      
      <style>
      @import "@/styles/styles.css"
      </style>