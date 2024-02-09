import Toast from '@/components/Toast.vue'

export function toastify(message) {
    const toast = <Toast>${message}</Toast>
}