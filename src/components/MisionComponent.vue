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
            <v-img src="../../public/crearMision.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Crear misión
                </h2>
                Crea una nueva Misión 
              </v-card-text>
    
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
              <v-btn @click="showCrearMisionDialog = true" variant="flat">Crear Misión</v-btn>
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
            <v-img src="../../public/listarMision.jpeg"></v-img>
    
              <v-card-text>
                <h2 class="text-h6 text-primary">
                  Listar misiones
                </h2>
                Muestra un listado de todas las misiones
              </v-card-text>
    
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center"
              >
              <v-btn variant="flat" @click=" showGetMisionesDialog= true ; verMisiones()">Ver misiones</v-btn>
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
          <!-- Diálogo para listar misiones -->
          <v-dialog v-model="showGetMisionesDialog" max-width="600px">
      <v-card>
        <v-card-title>Lista de Misiones</v-card-title>
        <v-card-text>
          <ul>
            <li v-for="(objeto, index) in useStoreMision().misiones" :key="index">
              <p>ID de la misión: {{ objeto.id}}</p>
              <p>Descripción de la mision: {{ objeto.descripcion}}</p>
              <p>Estado de la mision: {{ objeto.estadoMision}}</p>
              <p>Operativo de la misión: {{ objeto.opId}}</p>
              <p>Equipos de la misión:</p>
    <ul>
      <li v-for="(equipo, equipoIndex) in objeto.equipoAsignado" :key="equipoIndex">
        &nbsp;&nbsp;&nbsp;{{ equipo.descripcion }}
      </li>
    </ul>
  </li>
            
          </ul>
        </v-card-text>
        <v-card-actions>
          <!-- Botón para cerrar el diálogo -->
          <v-btn @click="showGetMisionesDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <!-- Diálogo para crear mision -->
        <v-dialog v-model="showCrearMisionDialog" max-width="600px">
          <v-card>
            <v-card-title>Crear Mision</v-card-title>
            <v-card-text>
              <!-- Formulario para crear mision -->
              <v-form @submit.prevent="crearMision(descripcion, estadoMision)">
                <v-text-field v-model="descripcion" label="Descripción"></v-text-field>
                
                <v-combobox
                 v-model="estadoMision"
                  label="Estado de la misión"
                 :items="['Planificada', 'Asignada', 'En Uso']"
        ></v-combobox>
                <v-btn type="submit" @click="showCrearMisionDialog = false;">Crear Mision</v-btn>
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
                <v-btn type="submit" @click="showAñadirEquipoMision = false;">Asignar Equipo</v-btn>
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
  

      const showGetMisionesDialog = ref(false);
      const showCrearMisionDialog = ref(false);
      const showAñadirMisionOperativo = ref(false);
      const showAñadirEquipoMision = ref(false);
      const notificacionOperativo = ref(false);

  
  
      const descripcion = ref('');
      const estadoMision = ref('');
  
  
      const opId = ref(0);
      const misionId = ref(0);
  
  
      const misId = ref(0);
      const eqId = ref(0);
      const { verOperativos } = useStoreOperativo();
      const { verMisiones } = useStoreMision();
      const { crearMision } = useStoreMision();
      const {verEquipos} = useStoreEquipo();
      const {añadirMision} = useStoreOperativo();
      const {añadirEquipo} = useStoreMision();
  
  
      </script>
      
      <style>
      @import "@/styles/styles.css"
      </style>