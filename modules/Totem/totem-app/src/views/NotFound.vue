<script setup>
import Spinner from "@/components/Spinner.vue";
import router from "@/router/index.js";

const logoSrc = `${import.meta.env.VITE_BASE_URL}/assets/imgs/logo3.png`

setTimeout(() => {
  router.push({name: 'events'})
}, 1000)
</script>

<template>
  <div class="container d-flex flex-column align-items-center vh-100 mt-5">
    <img :src="logoSrc" alt="relive logo"/>

    <div class="not-found-wrapper shadow">
      <h1 class="display-3">Página não encontrada</h1>
      <p>Parece que você foi longe demais. Estamos lhe redirecionando à página principal.</p>

      <Spinner class="spinner text-primary"/>

      <router-link to="/" class="btn btn-light mt-5">Voltar</router-link>
    </div>
  </div>
</template>

<style scoped>

.spinner {
  width: 7rem;
  height: 7rem;
}

img {
  width: 8rem;
  object-fit: contain;
  margin-bottom: 1rem;
}

.not-found-wrapper {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3rem 0;
  border-radius: 5rem;
  background-color: #fff;


  h1 {
    text-align: center;
  }
}
</style>