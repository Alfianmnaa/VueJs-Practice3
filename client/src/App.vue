<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

// access the `store` variable anywhere in the component ✨
const auth = useAuthStore();
const router = useRouter();

const onLogout = () => {
  auth.logout();
  router.push("/login");
};

const showAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Invalid Login",
    text: "Anda harus login untuk mengakses halaman ini!",
  });
};
</script>

<template>
  <div class="flex flex-col container mx-auto h-auto">
    <!--Header-->
    <div class="flex justify-between p-4 bg-[#eaeaea]">
      <!--Menu-->
      <div class="flex items-center gap-4">
        <img
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEikaqAsaQLlBnt63c0SeXr7BpogjD1M_L-dQkfnXsEwzM7PZX8DL8IZlk-Q33ejO59ypTULZjF3_jyKM6BXbdUHznUcFx9nqdby0sxqRyvMQu_XxziKAFCHwd6-DZ-pB_BUOybCSg5fAuJbBr3SE7w2ndN5mcfSXQmsImZFNORgJk9E7QOdofB5Ew/s1536/UIN%20Sunan%20Kalijaga%20Logo%20%5BKOLEKSILOGO.COM%5D.png"
          alt="logo"
          class="w-[50px] ml-2 mr-5"
        />
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link v-if="auth.username" to="/restricted">Listen</router-link>
        <p v-else @click="showAlert" class="cursor-pointer">Listen</p>
      </div>
      <!--Authenticated User-->
      <div class="flex gap-2 items-center">
        <p v-if="auth.username" class="py-5 px-[18px] rounded-full font-bold text-lg mr-5 border-2 border-black">{{ auth.username }}</p>
        <div v-if="auth.username">
          <button class="bg-red-500 text-white py-2 px-3 hover:brightness-90 duration-150 rounded-md" to="/login" @click="onLogout()">Logout</button>
        </div>

        <div v-else>
          <router-link class="bg-blue-500 text-white py-2 px-6 rounded-md hover:brightness-90 duration-150" to="/login">Login</router-link>
        </div>
      </div>
    </div>
    <!--Body-->
    <router-view></router-view>
  </div>
</template>
