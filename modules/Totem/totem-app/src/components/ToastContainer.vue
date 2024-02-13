<script setup>
import Toast from './Toast.vue'
import {computed, nextTick, reactive, ref} from "vue";

const props = defineProps(['color'])
const toasts = reactive({})
let toastsCount = 0
const messagesKeys = computed(() => Object.keys(toasts))
const color = ref(props.color)

function pushToast(message, colorMessage = null) {
  const propsColor = props.color

  if(colorMessage) {
    color.value = colorMessage
  }

  toasts[toastsCount++] = message

  nextTick(() => {
    color.value = propsColor
  })
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
      <Toast :color="color" @hidden="removeToast(key)">{{toasts[key]}}</Toast>
    </template>
  </div>
</template>