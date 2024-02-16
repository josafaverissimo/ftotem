<script setup>
import { computed, ref } from 'vue'
import { useRouter } from "vue-router";
import { useEventsStore } from "@/stores/events.js";
import { uploadVideo } from "@/services/clientMessage.js";
import { getByHash } from '@/services/events.js'
import Spinner from "@/components/Spinner.vue";
import ToastContainer from "@/components/ToastContainer.vue";

const router = useRouter()
const { hash: eventHash } = router.currentRoute.value.params

let videoStream = null
let mediaRecorder = null
let videoBlob = null

const allowedRecord = ref(!!navigator.mediaDevices)
const videoRecording = ref(null)
const videoRecorded = ref(null)
const stopTimer = ref('')
const beforeRecordingTimer = ref('')
const isRecording = ref(false)
const isRecorded = ref(false)
const isSendingVideo = ref(false)
const recordOrRestartText = computed(() => {
  return isRecorded.value ? 'Recomeçar' : 'Gravar'
})

const chosenVideoInput = ref(null)

const toastContainer = ref(null)

const eventsStore = useEventsStore()
const backgroundImgStyle = computed(() => ({
  backgroundImage: `url(${eventsStore.backgroundBaseUrl}/${eventsStore.currentEvent?.background})`
}))

function setStream(stream) {
  videoStream = stream
}

function startBeforeRecordingTimer() {
  let initialValue = 3

  return new Promise(resolve => {
    const interval = setInterval(() => {
      if(initialValue === 0) {
        clearInterval(interval)
        beforeRecordingTimer.value = ''

        resolve()
        return
      }

      beforeRecordingTimer.value = `${initialValue--}`
    }, 1000)
  })
}

function startStopTimer() {
  let initialValue = 30
  stopTimer.value = `(${initialValue})`

  const interval = setInterval( () => {
    if(initialValue === 0) {
      stopRecord()
      stopTimer.value = ''
      clearInterval(interval)
      return
    }

    stopTimer.value = `(${--initialValue})`
  }, 1000)

  return interval
}

async function startRecord(event) {
  if(isRecording.value || isSendingVideo.value) {
    return
  }

  const buttonStart = event.target
  buttonStart.classList.add('disabled', 'pe-none')

  try {
    await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(setStream)

  } catch(error) {
    allowedRecord.value = false

    buttonStart.classList.remove('disabled', 'pe-none')

    return
  }

  videoBlob = null
  isRecorded.value = false
  videoRecorded.value.src = ''
  isRecording.value = false
  videoRecording.value.srcObject = videoStream

  await startBeforeRecordingTimer()

  isRecording.value = true

  mediaRecorder = new MediaRecorder(videoStream, {mimeType: 'video/webm'})

  const timerInterval = startStopTimer()


  mediaRecorder.start()
  let chunks = []
  mediaRecorder.addEventListener('dataavailable', event => {
    chunks.push(event.data)
  })

  mediaRecorder.addEventListener('stop', event => {
    clearInterval(timerInterval)
    stopTimer.value = ''

    const blob = new Blob(chunks, {type: 'video/webm'})

    videoBlob = blob
    chunks = []
    videoRecorded.value.src = URL.createObjectURL(blob)
    isRecorded.value = true
    buttonStart.classList.remove('disabled', 'pe-none')
  })
}

function stopRecord() {
  isRecording.value = false

  mediaRecorder.stop()

  videoStream.getTracks().forEach(track => track.stop())
}

async function sendVideo() {
  isSendingVideo.value = true

  try {
    const {success, errors} = await uploadVideo(eventHash, videoBlob)

    if (success) {
      toastContainer.value.pushToast('Mensagem enviada', 'success')

      videoBlob = null
      isRecorded.value = false
      isRecording.value = false
      videoRecorded.value.src = ''

    } else {
      if(errors) {
        toastContainer.value.pushToast(errors.video, 'danger')
      } else {
        throw new Error()
      }
    }
  } catch(error) {
    toastContainer.value.pushToast('Houve um erro ao subir o arquivo. Por favor, Contate o administrador.', 'danger')
  } finally {
    isSendingVideo.value = false
  }
}

function chosenVideoHandler() {
  videoBlob = chosenVideoInput.value.files[0]

  if(videoBlob.type.split('/')[0] !== 'video') {
    toastContainer.value.pushToast('O arquivo não é um vídeo válido', 'danger')
    return
  }

  videoRecorded.value.src = URL.createObjectURL(videoBlob)

  isRecorded.value = true
}

async function setEventIfNotInStore() {
  if(eventsStore.currentEvent) {
    return
  }

  const {data} = await getByHash(eventHash)

  if(!data) {
    router.push('/')
    return
  }

  eventsStore.setCurrentEvent(data)
}

setEventIfNotInStore()

</script>

<template>
  <ToastContainer ref="toastContainer" />

  <div class="actions-buttons-wrapper border p-2 rounded-5">
    <router-link to="/" class="btn btn-dark rounded-5">
      <i class="bi bi-arrow-left-circle fs-5"></i>
    </router-link>
  </div>

  <div class="background-image wrapper" :style="backgroundImgStyle">
    <div class="container">
      <div class="card border">
        <span class="h2 title">Deixe uma Mensagem</span>

        <div class="video-wrapper">
          <span class="timer" v-if="!isRecording && !isRecorded">{{beforeRecordingTimer}}</span>
          <video class="recording" ref="videoRecording" muted autoplay :class="isRecording ? '' : 'd-none'"></video>
          <video class="recorded" ref="videoRecorded" controls v-if="!isRecording"></video>
        </div>

        <div class="btn-actions-wrapper">
          <div class="allowed-record-wrapper" v-if="allowedRecord">
            <button class="btn-record" @click="startRecord" :class="isSendingVideo || isRecording ? 'disabled' : ''">
              {{recordOrRestartText}}
            </button>
            <button class="btn-stop" :class="!isRecording ? 'disabled': ''" @click="stopRecord">
              Parar {{stopTimer}}
            </button>
          </div>

          <div class="not-allowed-record-wrapper w-100" v-else>
            <p class="not-allowed-record-text">Não foi possível acessar a câmera</p>
            <input type="file" name="chosen-video" capture="user" accept="video/*" ref="chosenVideoInput" hidden
              @change="chosenVideoHandler">
            <button class="choose-video" @click="chosenVideoInput.click" :class="isSendingVideo ? 'disabled' : ''">
              Selecionar Vídeo do Dispositivo
            </button>
          </div>

          <button :class="isRecorded ? '': 'disabled'" @click="sendVideo">
            <span v-if="!isSendingVideo">Enviar</span>
            <Spinner class="s-1rem" v-else/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .s-1rem {
    width: 1rem;
    height: 1rem;
  }

  .actions-buttons-wrapper {
    position: absolute;
    z-index: 1000;
    bottom: 10px;
    right: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    backdrop-filter: blur(12px);
  }

  .background-image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    -moz-border-radius: 10px
  }

  .wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card {
      justify-self: flex-end;
      position: relative;
      background-color: transparent;
      backdrop-filter: blur(12px);
      border: none;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 1rem;
      width: 40rem;

      .video-wrapper {
        width: 100%;
        position: relative;

        .timer {
          position: absolute;
          font-size: 15rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          z-index: 1000;
        }
      }

      .title {
        background-color: #000c;
        color: #fff;
        padding: .5rem 1.5rem;
        border-radius: 1rem;
        text-align: center;
      }

      video {
        width: 100%;
        aspect-ratio: 4/3;
      }

      .btn-actions-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: .3rem;
        gap: 1rem;

        .allowed-record-wrapper {
          display: flex;
          gap: 1rem;
        }

        .not-allowed-record-wrapper {
          display: flex;
          flex-direction: column;
          gap: .2rem;
          align-items: center;

          .not-allowed-record-text {
            background-color: #DC143C88;
            box-shadow: 1px 1px 16px #0005;
            color: #fff;
            font-weight: bold;
            padding: .5rem;
            border-radius: .5rem;
          }
        }

        button {
          outline: none;
          padding: .5rem 1rem;
          border-radius: 5rem;
          background-color: #000b;
          color: #fff;
          font-weight: bold;
          border: .225rem solid #363434;
        }

        .btn-record {
          background-color: #1034A6;
          border-color: #5e80ff;
        }

        .btn-stop {
          background-color: #DC143C;
          border-color: #f55273;
        }

        .disabled {
          opacity: .6;
          pointer-events: none;
        }
      }
    }
  }
</style>