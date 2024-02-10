<script setup>
import Toast from './Toast.vue'
import {computed, reactive} from "vue";

const props = defineProps(['color'])
const toasts = reactive({})
let toastsCount = 0
const messagesKeys = computed(() => Object.keys(toasts))

function pushToast(message) {
  toasts[toastsCount++] = message
}

function removeToast(index) {
  delete toasts[index]
}

defineExpose({
  pushToast
})
</script>

<template>
  <div class="toast-container toast-container position-fixed top-0 start-50 p-3 translate-middle-x">
    <template v-for="key in messagesKeys" :key="key">
      <Toast :color="props.color" @hidden="removeToast(key)">{{toasts[key]}}</Toast>
    </template>
  </div>
</template>