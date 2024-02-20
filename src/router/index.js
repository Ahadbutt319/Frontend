import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: { requiresAuth: false },
      component: () => import('pages/MainPanel.vue'),
      redirect: () => { return { path: '/products' } },
      children: [
        {
          path: 'products',
          name: 'products',
          meta: { requiresAuth: true },
          component: () => import('pages/Products..vue'),
        },
        {
          path: 'feedback',
          name: 'feedback',
          meta: { requiresAuth: true },
          component: () => import('pages/Feedback.vue'),
        }
      ]
    },
    {
      path: '/Signin',
      name: 'Signin',
      meta: { isGuest: true },
      component: () => import('pages/auth/Signin.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      meta: { isGuest: true },
      component: () => import('pages/auth/Signup.vue'),
    }
  ]
})
// const userStore = useAuthStore();
router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();

  if (to.meta.requiresAuth && !userStore.user.token) {
    console.log('token', userStore.user.token)
    console.log('True');
    next({ name: "Signin" });
  } else if (to.meta.isGuest && userStore.user.token) {
    console.log('token', userStore.user.token);
    console.log('False');
    next({ name: "Signin" });
  } else {
    next();
  }
});

function parseToken(token) {
  const payloadBase64 = token.split('.')[1]; // Extract payload from token
  const payload = JSON.parse(atob(payloadBase64)); // Decode base64 and parse JSON

  return payload;
}

const isTokenExpired = (token) => {
  if (!token) {
    return true; // Token not found or empty
  }

  const tokenData = parseToken(token); // Implement this function to parse token data
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return tokenData.exp < currentTime; // Compare expiration time with current time
}
export default router