<template>
  <h1 class="text-center font-bold text-3xl pt-20">Login Page</h1>
  <div class="flex justify-center p-4 w-full">
    <div class="w-[600px] flex flex-col gap-2">
      <input type="text" required v-model="username" class="border p-4" placeholder="Username" />
      <input type="password" required v-model="password" class="border p-4" placeholder="Password" />
      <button @click="onLogin()" :disabled="!isFormValid" class="bg-blue-500 text-white py-2 px-3 hover:brightness-90 duration-150">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

const auth = useAuthStore();

const username = ref("");
const password = ref("");

// Check if both username and password are not empty
const isFormValid = () => {
  return username.value.trim() !== "" && password.value.trim().length > 0;
};

const onLogin = async () => {
  if (isFormValid()) {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username.value,
        password: password.value,
      });

      if (response.data.status === "success") {
        auth.login(username.value);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        });
      } else if (response.data.status.includes("error")) {
        // Handle different error scenarios
        if (response.data.message === "Username not found") {
          Swal.fire({
            icon: "error",
            title: "Invalid Login",
            text: "Username not found. Please check your username.",
          });
        } else if (response.data.message === "Incorrect password") {
          Swal.fire({
            icon: "error",
            title: "Invalid Login",
            text: "Incorrect password. Please check your password.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid Login",
            text: "An error occurred during login. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred during login. Please try again.",
      });
    }
  } else {
    // Handle invalid form
    Swal.fire({
      icon: "error",
      title: "Invalid Login",
      text: "Please enter username and password",
    });
  }
};
</script>
