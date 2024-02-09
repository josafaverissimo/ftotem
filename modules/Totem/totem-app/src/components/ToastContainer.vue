<script setup>
import Toast from './Toast.vue'

const props = ['toastsMessages']
</script>

<template>
  <div class="toast-container toast-container position-fixed top-0 start-50 p-3 translate-middle-x">
    <template v-for="(message, index) in props.toastsMessages" :key="index">
      <Toast>{{message}}</Toast>
    </template>
  </div>
</template>