<script setup>
import {onMounted, ref} from 'vue'

const emit = defineEmits(['hidden'])
const props = defineProps(['color'])
const textBgColor = props.color ? `text-bg-${props.color}` : 'text-bg-dark'
const toast = ref(null)

onMounted(() => {
  bootstrap.Toast.getOrCreateInstance(toast.value).show()

  const {value: toastElement} = toast

  toastElement.addEventListener('hidden.bs.toast', () => emit('hidden'))

  setTimeout(() => {
    toastElement.classList.remove('animate__fadeInDown')
    toastElement.classList.add('animate__fadeOutUp')

    setTimeout(() => {
      emit('hidden')
    }, 800)
  }, 3000)
})
</script>

<template>
  <div class="toast align-items-center border-0 animate__animated animate__fadeInDown" :class="textBgColor" ref="toast"
       data-bs-animation="false" data-bs-autohide="false">
    <div class="d-flex">
      <div class="toast-body">
        <slot></slot>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>
</template>