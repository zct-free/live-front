import { ref } from 'vue';
import router from '@/router'; // Import router for programmatic navigation in logout
import {useUserStore} from  '@/store/user'

const isAuthenticated = ref<boolean>(localStorage.getItem('isAuthenticated') === 'true');

export const checkAuth = (): boolean => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated.value;
};

export const login = (username: string, pass: string): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (username === 'admin' && pass === 'password') {
        localStorage.setItem('isAuthenticated', 'true');
        
        isAuthenticated.value = true;
        resolve(true);
      } else {
        localStorage.removeItem('isAuthenticated');
        isAuthenticated.value = false;
        resolve(false);
      }
    }, 500);
  });
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = false;
  router.push({ name: 'login' }); // Redirect to login after logout
}; 