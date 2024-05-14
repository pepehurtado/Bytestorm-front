import { defineStore } from 'pinia';
import { getMisiones, createMision, addEquipoToMision } from '@/api/apiMisiones';

export const useStoreMision = defineStore('storeMision', {
  state: () => ({
    misiones: [],
  }),

  actions: {
    setMisiones(misiones) {
      this.misiones = misiones;
    },

    async verMisiones() {
      try {
        const response = await getMisiones();
        this.setMisiones(response);
        for (const mision of this.misiones) {
          if (mision.estadoMision === 0) {
            mision.estadoMision = 'Planificada';
          }
          if (mision.estadoMision === 1) {
            mision.estadoMision = 'Activa';
          }
          if (mision.estadoMision === 2) {
            mision.estadoMision = 'En Uso';
          }
        }
        return this.misiones;
      } catch (error) {
        console.error('Error al obtener misiones:', error);
      }
    },
    async crearMision(descripcion, estadoMision) {
      try {
        var estadoInt;
        if(estadoMision=='Planificada'){ estadoInt = 0;}
        if(estadoMision=='Asignada'){ estadoInt = 1;}
        if(estadoMision=='En Uso'){ estadoInt = 2;}
        console.log(estadoInt);
         await createMision(descripcion, estadoInt)
      } catch (error) {
        console.error('Error al crear mision:', error);
      }
    },
    async añadirEquipo(id, idEquipo) {
      try {
         await addEquipoToMision(id, idEquipo)
      } catch (error) {
        console.error('Error al crear mision:', error);
      }
    },
  },
});