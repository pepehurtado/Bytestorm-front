// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/LoginComponent.vue';
import MenuBS from '@/components/MenuBS.vue';
import OperativoComnponent from '@/components/OperativoComponent.vue';
import MisionComponent from '@/components/MisionComponent.vue';
import EquipoComponent from '@/components/EquipoComponent.vue';

const routes = [
  { path: '/', redirect: '/login' }, // Redirige la URL raíz a la página de login
  { path: '/login', component: LoginComponent },
  { path: '/menu', component: MenuBS, meta: { requiresAuth: true } },
  { path: '/operativo', component: OperativoComnponent, meta: { requiresAuth: true } },
  { path: '/mision', component: MisionComponent, meta: { requiresAuth: true } },
  { path: '/equipo', component: EquipoComponent, meta: { requiresAuth: true } },
  // Otras rutas si las tienes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación para verificar la autenticación
router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar si hay un token de autenticación en el almacenamiento local
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      // Si no hay un token, redirigir a la página de login
      next('/login');
    } else {
      // Si hay un token, permitir el acceso a la ruta
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permitir el acceso
    next();
  }
});

export default router;
