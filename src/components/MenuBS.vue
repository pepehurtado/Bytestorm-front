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
        <v-hover v-slot="{ isHovering, props }" >
          <v-card 
          class="mx-auto carta"
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
            <v-btn class="startDialog" @click="showCrearMisionDialog = true" variant="flat">Crear Misión</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
  
        <v-hover v-slot="{ isHovering, props }" >
          <v-card
            class="mx-auto carta"
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
            <v-btn class= "startDialog" @click="showCrearOperativoDialog = true" variant="flat">Crear Operativo</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          class="mx-auto carta"
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
            <v-btn class="startDialog" @click="showCrearEquipoDialog = true" variant="flat">Crear Equipo</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
      </v-row>
  </v-container>
  <v-container>
  <v-row>
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          class="mx-auto carta"
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
            <v-btn class="startList" variant="flat" @click=" showGetMisionesDialog= true ; verMisiones()">Ver misiones</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
  
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          class="mx-auto carta"
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
            <v-btn class="startList" @click=" showGetOperativosDialog= true ; verOperativos()">Ver operativos</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          class="mx-auto carta"
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
            <v-btn class="startList"  @click=" showGetEquiposDialog= true ; verEquipos()">Ver equipos</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
      </v-row>
  </v-container>
  <v-container>
  <v-row class="mb-10">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          class="mx-auto carta"
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
              <v-btn class="addToNew" @click="showAñadirMisionOperativo=true; verMisiones(); verOperativos()">Añadir</v-btn>
            </v-overlay>
          </v-card>
        </v-hover>
  
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          class="mx-auto carta"
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
              <v-btn class="addToNew" @click=" showAñadirEquipoMision=true">Añadir</v-btn>
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
              <v-btn class="startDialog" type="submit" @click="showCrearOperativoDialog = false">Crear Operativo</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- Diálogo para listar operativos -->
      <v-dialog v-model="showGetOperativosDialog" max-width="600px">
    <v-card>
      <v-card-title>Lista de Operativos</v-card-title>
      <v-card-text>
        <ul>
          <li v-for="(objeto, index) in useStoreOperativo().operativos" :key="index">
            <p>ID del Operativo: {{ objeto.id}}  <v-btn class="boton-azul" type="submit" @click="putId  = objeto.id ; putName=objeto.name; putRol=objeto.rol; 
            showModificarOperativoDialog = true">Modificar</v-btn> 
            <v-btn class="boton-rojo"  type="submit" @click="putId  = objeto.id ; putName=objeto.name; putRol=objeto.rol; 
            showEliminarOperativoDialog = true; obj = objeto">Eliminar</v-btn></p>
            <p>Nombre del Operativo: {{ objeto.name}}</p>
            <p>Rol del Operativo: {{ objeto.rol}}</p>
            <p>Misiones del Operativo:</p>
            <ul>
            <li v-for="(mision, misionIndex) in objeto.misionAsignada" :key="misionIndex">
      &nbsp;&nbsp;&nbsp;&nbsp;{{ mision.descripcion }} con ID {{ mision.id }}
            </li>
          </ul>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <!-- Botón para cerrar el diálogo -->
        <v-btn class="closeDialog" variant="text" @click="showGetOperativosDialog = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
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
              <v-btn type="submit" class="closeDialog" @click="showEliminarOperativoDialog = false">Eliminar Operativo</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
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
        <v-btn class="closeDialog"  @click="showGetMisionesDialog = false">Cerrar</v-btn>
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
              <v-btn class="startDialog" type="submit" @click="showCrearMisionDialog = false;">Crear Mision</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
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
        <v-btn class="closeDialog"  @click="showGetEquiposDialog = false">Cerrar</v-btn>
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
              <v-btn type="submit" class="startDialog" @click="showCrearEquipoDialog = false;">Crear Equipo</v-btn>
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
            <!-- Formulario para asignar un equipo a una misión -->
            <v-form @submit.prevent="añadirEquipo(misId,eqId)">
              <v-text-field v-model.number="misId" label="ID de la Misión"></v-text-field>
              <v-text-field v-model.number="eqId" label="ID del Equipo"></v-text-field>
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

    const showCrearOperativoDialog = ref(false);
    const showGetOperativosDialog = ref(false);
    const showGetMisionesDialog = ref(false);
    const showCrearMisionDialog = ref(false);
    const showGetEquiposDialog = ref(false);
    const showCrearEquipoDialog = ref(false);
    const showAñadirMisionOperativo = ref(false);
    const showAñadirEquipoMision = ref(false);
    const showModificarOperativoDialog = ref(false);
    const showEliminarOperativoDialog = ref(false);
    const notificacionOperativo = ref(false);
    const tipoEquipo = ref('');
    const descrip = ref('');
    const estadoEquipo = ref('');

    const name = ref('');
    const rol = ref('');

    const descripcion = ref('');
    const estadoMision = ref('');


    const opId = ref(0);
    const misionId = ref(0);

    const putId = ref(0);
    const putName = ref('');

    const misId = ref(0);
    const eqId = ref(0);
    const { verOperativos } = useStoreOperativo();
    const { verMisiones } = useStoreMision();
    const { crearOperativo } = useStoreOperativo();
    const { crearMision } = useStoreMision();
    const {verEquipos} = useStoreEquipo();
    const {crearEquipo} = useStoreEquipo();
    const {añadirMision} = useStoreOperativo();
    const {añadirEquipo} = useStoreMision();
    const {modificarOperativo} = useStoreOperativo();
    const {eliminarOperativo} = useStoreOperativo();


    </script>
    
    <style>
    @import "../styles/styles.css"
    </style>