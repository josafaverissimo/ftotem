<script setup>
import { useJwtStore } from "@/stores/jwt.js";
import {computed} from "vue";
import { logout } from "@/services/auth.js";

const jwtStore = useJwtStore()
const firstName = computed(() => {
  if(!jwtStore.data) {
    return ''
  }
  return jwtStore.data.name.split(' ')[0]
})

</script>

<template>
  <header>
    <nav>
      <div class="logo-wrapper">
        <img src="/logo3.png" alt="relive logo">
      </div>

      <slot></slot>

      <div class="d-flex flex-column">
        <span class="text-capitalize" v-if="firstName">Olá, {{firstName}}</span>

        <button class="btn btn-sm btn-outline-dark rounded-5 align-self-center px-3" @click="logout">
          <i class="bi bi-escape h5"></i>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  @media (max-width: 991px) {
    nav span {
      display: none;
    }
  }

  header {
    padding: 0 1rem;
    width: 100vw;
    max-width: 100vw;
    background-color: #fff;
    box-shadow: 1px 1px 1rem #ccc;

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
  }
</style>