<script setup>
import {computed, onMounted, reactive, ref} from 'vue'
import { useRouter } from "vue-router";
import { useEventsStore } from "@/stores/events.js";
import { uploadVideo } from "@/services/clientMessage.js";
import { getByHash } from '@/services/events.js'
import fixWebmDuration from "fix-webm-duration";
import Spinner from "@/components/Spinner.vue";
import ToastContainer from "@/components/ToastContainer.vue";
import Slider from "@/components/Slider.vue";

const router = useRouter()
const { hash: eventHash } = router.currentRoute.value.params

let videoStream = null
let mediaRecorder = null
let videoBlob = null

const allowedRecord = ref(!!navigator.mediaDevices)
const videoRecording = ref(null)
const videoRecorded = ref(null)
const videoRecordedControls = reactive({
  length: '00:00',
  progress: '00:00',
  barMaxValue: 0,
  barStep: 0.01,
  barValue: 0,
  isPlaying: false,
  isFullscreen: false
})
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

const cardElement = ref(null)

const eventsStore = useEventsStore()
const backgroundImgStyle = computed(() => ({
  backgroundImage: `url(${eventsStore.backgroundBaseUrl}/${eventsStore.currentEvent?.background})`
}))

function changeVideoControlsBarValue(value) {
  videoRecordedControls.barValue = value
  videoRecorded.value.currentTime = value
}

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
  let initialValue = 20
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

  fullscreenRecordedVideo()

  mediaRecorder = new MediaRecorder(videoStream, {mimeType: 'video/webm'})

  const timerInterval = startStopTimer()

  mediaRecorder.start()

  const startTime = Date.now()
  let chunks = []
  mediaRecorder.addEventListener('dataavailable', event => {
    chunks.push(event.data)
  })

  mediaRecorder.addEventListener('stop', async (event) => {
    const duration = Date.now() - startTime

    clearInterval(timerInterval)
    stopTimer.value = ''

    videoBlob = await fixWebmDuration(new Blob(chunks, {type: 'video/webm'}), duration, {logger: false})
    chunks = []

    videoRecorded.value.src = URL.createObjectURL(videoBlob)

    videoRecorded.value.load()

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
  if(isSendingVideo.value) {
    return
  }

  isSendingVideo.value = true

  try {
    const {success, errors} = await uploadVideo(eventHash, videoBlob)

    if (success) {
      toastContainer.value.pushToast('Vídeo Enviado!', 'success')

      videoBlob = null
      isRecorded.value = false
      isRecording.value = false
      videoRecorded.value.src = ''

      resetVideoRecordedControls()
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

function setRecordedVideoLength(duration) {
  const durationSecondsString = String(Math.floor(duration)).padStart(2, '0')
  videoRecordedControls.length =  `00:${durationSecondsString}`
}

function setVideoControlsData() {
  const duration = videoRecorded.value.duration

  if(isNaN(duration) || !isFinite(duration)) {
    return
  }

  setRecordedVideoLength(duration)
  videoRecordedControls.barMaxValue = duration
}

function togglePlayRecordedVideo() {
  if(videoRecordedControls.isPlaying) {
    videoRecorded.value.pause()

  } else {
    videoRecorded.value.play()
  }

  videoRecordedControls.isPlaying = !videoRecordedControls.isPlaying
}

function resetVideoRecordedControls() {
  videoRecordedControls.isPlaying = false
  videoRecordedControls.barValue = 0
  videoRecordedControls.progress = '00:00'
}

function timeUpdateHandler() {
  const currentTimeSeconds = String(Math.floor(videoRecorded.value.currentTime)).padStart(2, '0')

  videoRecordedControls.barValue = videoRecorded.value.currentTime
  videoRecordedControls.progress = `00:${currentTimeSeconds}`
}

function fullscreenRecordedVideo() {
  if(videoRecordedControls.isFullscreen) {
    return
  }

  document.body.requestFullscreen()

  cardElement.value.classList.add('fullscreen')

  videoRecordedControls.isFullscreen = true
}

function toggleFullscreenRecordedVideo() {
  if(!videoRecordedControls.isFullscreen) {
    fullscreenRecordedVideo()

    return
  }

  cardElement.value.classList.remove('fullscreen')
  document.exitFullscreen()
  videoRecordedControls.isFullscreen = !videoRecordedControls.isFullscreen
}

setEventIfNotInStore()

onMounted(() => {
  videoRecorded.value.addEventListener('durationchange', setVideoControlsData)

  videoRecorded.value.addEventListener('timeupdate', timeUpdateHandler)

  videoRecorded.value.addEventListener('ended', resetVideoRecordedControls)
})

</script>

<template>
  <ToastContainer ref="toastContainer" style="z-index: 3000"/>

  <div class="actions-buttons-wrapper border p-2 rounded-5">
    <router-link to="/" class="btn btn-dark rounded-5">
      <i class="bi bi-arrow-left-circle fs-5"></i>
    </router-link>
  </div>

  <div class="background-image wrapper" :style="backgroundImgStyle">
    <div class="container-fluid">
      <div class="card border" ref="cardElement">
        <span class="h4 title">Deixe sua mensagem</span>

        <div class="video-wrapper">
          <span class="timer" v-if="!isRecording && !isRecorded">{{beforeRecordingTimer}}</span>
          <video class="recording" ref="videoRecording" muted autoplay tabindex="-1"
            :class="isRecording ? '' : 'd-none'"></video>

          <video class="recorded" ref="videoRecorded" tabindex="-1" :class="!isRecording ? '' : 'd-none'"></video>

          <div class="video-controls">
            <Slider class="my-slider" :step="videoRecordedControls.barStep" :min="0"
              :value="videoRecordedControls.barValue" :max="videoRecordedControls.barMaxValue"
              @change="changeVideoControlsBarValue"/>

            <div class="btn-wrapper">
              <div class="btn-play-wrapper">
                <button class="btn-control" :class="!isRecorded ? 'disabled' : ''" @click="togglePlayRecordedVideo">
                  <i class="bi bi-play-fill" v-if="!videoRecordedControls.isPlaying"></i>
                  <i class="bi bi-pause-fill" v-else></i>
                </button>

                <span class="video-time" v-if="isRecorded">{{videoRecordedControls.progress}} | {{videoRecordedControls.length}}</span>

                <button class="btn-control btn-fullscreen-mobile" @click="toggleFullscreenRecordedVideo">
                  <i class="bi bi-fullscreen" v-if="!videoRecordedControls.isFullscreen"></i>
                  <i class="bi bi-fullscreen-exit" v-else></i>
                </button>
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

              <button class="btn-control btn-fullscreen-desktop" @click="toggleFullscreenRecordedVideo">
                <i class="bi bi-fullscreen" v-if="!videoRecordedControls.isFullscreen"></i>
                <i class="bi bi-fullscreen-exit" v-else></i>
              </button>
            </div>
          </div>
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

    .container-fluid {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .card {
      position: relative;
      background-color: transparent;
      backdrop-filter: blur(12px);
      border: none;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 1rem;
      width: 80%;

      .video-wrapper {
        width: 100%;
        position: relative;

        .timer {
          position: absolute;
          z-index: 10;
          font-size: 15em;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
        }

        @media (max-width: 991px) {
          .timer {
            font-size: 5rem;
          }
        }

        video {
          width: 100%;
          max-height: 70vh;
          background: #000;
          object-fit: contain;
          border-radius: .7rem;
          transform: scaleX(-1);
        }
      }

      .title {
        background-color: #000c;
        color: #fff;
        padding: .5rem 1.5rem;
        border-radius: 1rem;
        text-align: center;
      }

      .video-controls {
        position: absolute;
        bottom: 1rem;
        width: 100%;
        padding: 0 1rem;

        .my-slider {
          width: 100%;
          margin-bottom: 1rem;
        }

        .btn-wrapper {
          display: flex;
          justify-content: space-between;

          .btn-play-wrapper {
            display: flex;
            gap: 1rem;

            .video-time {
              align-self: center;
              color: #fff;
              background-color: #fff2;
              padding: .3rem .5rem;
              border-radius: .5rem;
            }

            .btn-fullscreen-mobile {
              display: none;
            }
          }

          .btn-control {
            background-color: #fff;
            border: none;
            outline: none;
            padding: 0 1rem;
            font-size: 1.5rem;
            border-radius: 1rem;
          }

          .btn-control.disabled {
            opacity: .5;
            pointer-events: none;
          }

          @media (min-width: 991px) {
            .btn-actions-wrapper {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
            }
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

        @media (max-width: 991px) {
          .btn-wrapper {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;

            .btn-play-wrapper {
              display: flex;
              justify-content: space-between;
              width: 100%;

              .btn-fullscreen-mobile {
                display: block;
              }
            }

            .btn-fullscreen-desktop {
              display: none;
            }
          }
        }
      }
    }

    .card.fullscreen {
      position: absolute;
      top: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      border: none!important;
      border-radius: 0!important;
      z-index: 2000;

      .video-wrapper {
        position: absolute;
        top: 0;

        video {
          height: 100vh;
          max-height: 100vh;
          border-radius: 0;
        }
      }
    }

    @media (max-width: 991px) {
      .card:not(.fullscreen) {
        .video-controls {
          position: relative;
        }
      }
    }
  }
</style>