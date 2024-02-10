<script setup>
import { useConfig } from "@/config/index.js";
import { useJwtStore } from "@/stores/jwt.js";
import {computed} from "vue";

const config = useConfig()
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

      <span class="text-capitalize" v-if="firstName">Olá, {{firstName}}</span>
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