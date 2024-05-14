import { defineStore } from 'pinia';
import { getEquipos, createEquipo } from '@/api/apiEquipos';

export const useStoreEquipo = defineStore('storeEquipo', {
  state: () => ({
    equipos: [],
  }),

  actions: {
    setEquipos(equipos) {
      this.equipos = equipos;
    },

    async verEquipos() {
      try {
        const response = await getEquipos();
        this.setEquipos(response);
        for (const equipo of this.equipos) {
          if (equipo.estadoEquipo === 0) {
            equipo.estadoEquipo = 'Disponible';
          }
          if (equipo.estadoEquipo === 1) {
            equipo.estadoEquipo = 'En Uso';
          }
          if (equipo.tipoEquipo === 0) {
            equipo.tipoEquipo = 'Hardware';
          }
          if (equipo.tipoEquipo === 1) {
            equipo.tipoEquipo = 'Software';
          }
        }
        return this.equipos;
      } catch (error) {
        console.error('Error al obtener misiones:', error);
      }
    },
    async crearEquipo(tipoEquipo, descrip, estado) {
        try {
          var tipoInt;
          var estadoInt;
          if(estado=='Disponible'){ estadoInt = 0;}
          if(estado=='En Uso'){ estadoInt = 1;}
          if(tipoEquipo=='Hardware'){ tipoInt = 0;}
          if(tipoEquipo=='Software'){ tipoInt = 1;}

           await createEquipo(tipoInt, descrip, estadoInt)
        } catch (error) {
          console.error('Error al crear mision:', error);
        }
      },
  },
});