<script setup>
import { useConfig } from "@/config/index.js";
import { useJwtStore } from "@/stores/jwt.js";
import router from '@/router';
import {computed} from "vue";

const config = useConfig()
const jwtStore = useJwtStore()
const firstName = computed(() => {
  if(!jwtStore.data) {
    return ''
  }
  return jwtStore.data.name.split(' ')[0]
})

function logout() {
  jwtStore.$reset()
  router.push({name: 'login'})
}

</script>

<template>
  <header>
    <nav>
      <div class="logo-wrapper">
        <img src="/logo3.png" alt="relive logo">
      </div>

      <slot></slot>

      <div class="logout-wrapper">
        <span class="text-capitalize" v-if="firstName">Olá, {{firstName}}</span>
        <button class="btn btn-light" @click="logout">
          <i class="bi bi-escape fs-5"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  header {
    padding: 0 1rem;
    width: 100vw;
    max-width: 100vw;

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .logo-wrapper {
        img {
          width: 7rem;
          height: 7rem;
          object-fit: contain;
        }
      }
    }

    .logout-wrapper {
      display: flex;
      flex-direction: column;
      font-weight: bold;
    }
  }
</style>