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
import { useUserStore } from '@/store/user';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const formState = reactive({
  username: 'admin',
  password: 'password',
});

const loading = ref(false);

const onFinish = async (values: any) => {
  loading.value = true;
  try {
    await userStore.login({
      username: values.username,
      password: values.password,
    });
    
    message.success('登录成功！');
    
    // 获取重定向路径或默认跳转到首页
    const redirectPath = router.currentRoute.value.query.redirect as string || '/home';
    router.push(redirectPath);
  } catch (error: any) {
    console.error('登录失败:', error);
    message.error(error.message || '用户名或密码错误');
  } finally {
    loading.value = false;
  }
};
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