<script setup>
const props = defineProps(['color'])
const textBgColor = props.color ? `text-bg-${props.color}` : 'text-bg-dark'
</script>

<template>
  <div class="toast align-items-center border-0" :class="textBgColor">
    <div class="d-flex">
      <div class="toast-body">
        Ola
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</template>