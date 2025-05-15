<template>
  <div class="login-container">
    <a-card title="Login" :style="{ width: '350px' }">
      <a-form :model="formState" @finish="onFinish">
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="Username">
            <template #prefix><UserOutlined /></template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" placeholder="Password">
            <template #prefix><LockOutlined /></template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="loading" block>
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// Ant Design components like ACard, AForm, etc. are globally registered or available via unplugin-vue-components
// If not, they need to be imported explicitly:
// import { Card as ACard, Form as AForm, FormItem as AFormItem, Input as AInput, Button as AButton, message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { login as attemptLogin } from '@/services/authService';
import { message } from 'ant-design-vue'; // Import message directly for use

// defineOptions({ name: 'LoginView' }); // Optional

const router = useRouter();
const formState = reactive({
  username: 'admin',
  password: 'password',
});
const loading = ref(false);

const onFinish = async (values: any) => {
  loading.value = true;
  const success = await attemptLogin(values.username, values.password);
  if (success) {
    message.success('Login successful!');
    const redirectPath = router.currentRoute.value.query.redirect as string || { name: 'home' };
    router.push(redirectPath);
  } else {
    message.error('Invalid username or password');
  }
  loading.value = false;
};

// Note: The checkAuth and logout functions were moved to authService.ts previously.
// If they were intended to remain or be accessible here for other reasons,
// that would require a different approach or re-importing from authService if needed.
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}
</style> 