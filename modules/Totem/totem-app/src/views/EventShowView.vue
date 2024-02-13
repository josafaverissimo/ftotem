<script setup>
import { ref } from 'vue'
import { useEventsStore } from "@/stores/events.js";
import { uploadVideo } from "@/services/clientMessage.js";
import Spinner from "@/components/Spinner.vue";
import ToastContainer from "@/components/ToastContainer.vue";

let videoStream = null
let mediaRecorder = null
let videoBlob = null

const videoPlayer = ref(null)
const videoRecorded = ref(null)
const stopTimer = ref('')
const beforeRecordingTimer = ref('')
const isRecording = ref(false)
const isRecorded = ref(false)
const isSendingVideo = ref(false)

const toastContainer = ref(null)

const eventsStore = useEventsStore()
const backgroundImgStyle = {
  backgroundImage: `url(${eventsStore.backgroundBaseUrl}/${eventsStore.currentEvent.background})`
}

function setStream(stream) {
  videoStream = stream
  videoPlayer.value.srcObject = stream
  mediaRecorder = new MediaRecorder(stream, {mimeType: 'video/webm'})
}

function startBeforeRecordingTimer() {
  let initialValue = 0

  return new Promise(resolve => {
    const interval = setInterval(() => {
      if(initialValue === 3) {
        clearInterval(interval)
        beforeRecordingTimer.value = ''

        resolve()
        return
      }

      beforeRecordingTimer.value = `${++initialValue}`
    }, 1000)
  })
}

function startStopTimer() {
  let initialValue = 30

  const interval = setInterval( () => {
    if(initialValue === 0) {
      stopRecord()
      stopTimer.value = ''
      clearInterval(interval)
      return
    }

    stopTimer.value = `(${initialValue--})`
  }, 1000)

  return interval
}

async function startRecord() {
  if(isRecording.value) {
    return
  }

  videoBlob = null
  isRecorded.value = false
  videoRecorded.value.src = ''
  isRecording.value = false

  await startBeforeRecordingTimer()

  isRecording.value = true

  const timerInterval = startStopTimer()

  await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(setStream)
  let chunks = []

  mediaRecorder.start()

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
    const {success} = await uploadVideo(videoBlob)

    if (success) {
      toastContainer.value.pushToast('Mensagem enviada', 'success')

      videoBlob = null
      isRecorded.value = false
      isRecording.value = false
      videoRecorded.value.src = ''

    } else {
      toastContainer.value.pushToast('Houve um erro ao subir o arquivo. Por favor, Contate o administrador.', 'danger')
    }
  } catch(error) {
    toastContainer.value.pushToast('Houve um erro ao subir o arquivo. Por favor, Contate o administrador.', 'danger')
  } finally {
    isSendingVideo.value = false
  }
}

</script>

<template>
  <ToastContainer ref="toastContainer" />

  <div class="background-image wrapper" :style="backgroundImgStyle">
    <div class="container">
      <div class="video"></div>

      <div class="card border">
        <span class="h2 title">Deixe uma Mensagem</span>

        <div class="video-wrapper">
          <span class="timer" v-if="!isRecording && !isRecorded">{{beforeRecordingTimer}}</span>
          <video class="recording" ref="videoPlayer" muted autoplay v-if="isRecording"></video>
          <video class="recorded" ref="videoRecorded" controls v-else></video>
        </div>

        <div class="btn-wrapper">
          <button class="btn-record" @click="startRecord">Gravar</button>
          <button class="btn-stop" :class="!isRecording ? 'disabled': ''" @click="stopRecord">Parar {{stopTimer}}</button>
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
      justify-content: space-between;
      align-items: center;
      height: 100vh;
    }

    .card {
      justify-self: flex-end;
      position: relative;
      background-color: transparent;
      backdrop-filter: blur(12px);
      border: none;
      width: 50%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 1rem;

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
        padding: .5rem 1rem;
        border-radius: 4rem;
      }

      video {
        width: 100%;
        aspect-ratio: 4/3;
      }

      .btn-wrapper {
        display: flex;
        gap: 1rem;
        margin-top: .3rem;

        button {
          border: none;
          outline: none;
          padding: .5rem 1rem;
          border-radius: 5rem;
          background-color: #000b;
          color: #fff;
          font-weight: bold;
          box-shadow: 1px 1px 16px #000;
        }

        .btn-record {
          background-color: #1034A6;
        }

        .btn-stop {
          background-color: #DC143C;
        }

        .disabled {
          opacity: .6;
          pointer-events: none;
        }
      }
    }
  }
</style>