import { defineStore } from 'pinia';
import { createOperativo, getOperativos, getOperativo, addMisionToOperativo, putOperativo, deleteOperativo } from '@/api/apiOperativos';

export const useStoreOperativo = defineStore('storeOperativo', {
  state: () => ({
    operativos: [],
    lastStatus: ""
  }),

  actions: {
    setOperativos(operativos) {
      this.operativos = operativos;
    },

    async verOperativos() {
      try {
        const response = await getOperativos();
        this.setOperativos(response);
        return this.operativos;
      } catch (error) {
        console.error('Error al obtener operativos:', error);
      }
    },

    async crearOperativo(name, rol) {
      try {
         await createOperativo(name,rol)
         await this.verOperativos();
         
      } catch (error) {
        console.error('Error al obtener operativos:', error);
      }
    },
    async añadirMision(id, idMision) {
      try {
         var response = await addMisionToOperativo(id, idMision);
         this.lastStatus = response;
         var index = this.operativos.findIndex((x) => x.id === id);
         var responseG = await getOperativo(id);
         this.operativos.splice(index, 1 ,responseG);
         console.log("ultimo : ",this.lastStatus);
      } catch (error) {
        console.error('Error al obtener operativos:', error);
      }
    },
    async modificarOperativo(id ,name, rol) {
      try {
         await putOperativo(id, name,rol);
         var index = this.operativos.findIndex((x) => x.id === id);
         var response = await getOperativo(id);
      } catch (error) {
        console.error('Error al obtener operativos:', error);
      }
      //var operativoModicado = this.operativos.find(id);
      console.log("Put prueba =",response)
      console.log("Index = ",index);
      this.operativos.splice(index, 1 ,response);
    },
    async eliminarOperativo(id) {
      try {
        var index = this.operativos.findIndex((x) => x.id === id);
         await deleteOperativo(id);
         this.operativos.splice(index, 1);
      } catch (error) {
        console.error('Error al obtener operativos:', error);
      }
    },
  },
});