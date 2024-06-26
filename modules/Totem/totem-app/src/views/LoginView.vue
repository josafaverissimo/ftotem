<script setup>
import {doLogin} from "@/services/auth.js";
import {useJwtStore} from '@/stores/jwt.js'
import {useMask} from "@/utils/mask.js";
import {reactive, ref} from "vue";
import router from "@/router/index.js";
import Spinner from "@/components/Spinner.vue";
import ToastContainer from '@/components/ToastContainer.vue';

const {vMask} = useMask()
const toastContainer = ref(null)
const toasts = reactive({
  messages: []
})
const form = reactive({
  username: '',
  password: '',
  isSubmitting: false
})
const jwtStore = useJwtStore()

function setToatsMessages(value) {
  toasts.messages = value
}

async function formLoginHandler() {
  if(form.isSubmitting) {
    return
  }
  form.isSubmitting = true

  const data = await doLogin(form.username, form.password)

  if(data.success) {
    jwtStore.setToken(data.token)

    return router.push('/')
  }

  toastContainer.value.pushToast('Credenciais incorretas.')

  setTimeout(function() {
    form.isSubmitting = false
  }, 1000)
}

function changeUsername({value}) {
  form.username = value
}

</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-center mt-5">
      <div class="card-wrapper animate__animated animate__fadeInDown">
        <div class="card-header">
          <h1 class="h3 fw-light">Bem-vindo(a)</h1>
          <img src="/logo3.png" alt="relive logo">
        </div>

        <div class="card-body">
          <form @submit.prevent="formLoginHandler">
            <div>
              <label for="username">Usuário</label>
              <input id="username" name="username" type="text" class="form-control form-control-lg"
                placeholder="e.g.: joao123" ref="cpfInput"
                v-mask:alhpanumericspacesdots @accept="({detail}) => changeUsername(detail)">
              <span class="input-error-message">O campo é obrigatório</span>
            </div>

            <div>
              <label for="password">Senha</label>
              <input id="password" name="password" type="password" class="form-control form-control-lg"
                placeholder="e.g.: *******" v-model="form.password">
              <span class="input-error-message">O campo é obrigatório</span>
            </div>

            <button type="submit">
              <span v-if="!form.isSubmitting">Entrar</span>
              <Spinner v-else class="s-1rem text-light"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <ToastContainer ref="toastContainer" color="warning"></ToastContainer>
</template>

<style scoped>

  .s-1rem {
    width: 1rem;
    height: 1rem;
  }

  .card-wrapper {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 3rem;
    border-radius: 5rem;

    .card-header {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 12rem;
        height: 12rem;
        object-fit: contain;
      }
    }

    .card-body {
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        button[type="submit"] {
          border-radius: .325rem;
          border: none;
          outline: none;
          font-weight: bold;
          padding: .4rem 0;
          background-color: #1034A6;
          color: #fff;
        }
      }
    }
  }
</style>