<script setup>
const props = defineProps(['class'])
</script>

<template>
  <div class="spinner-border text-light" :class="props.class" role="status"></div>
</template>