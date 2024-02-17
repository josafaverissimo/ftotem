import { MySelect } from "../mySelect/main.js";
import { EventsService } from "../services/events.js";
import { EventsVideosService } from '../services/eventsVideos.js'

export class EventsVideosPage {
    constructor() {
        this.__init()
    }

    __init() {
        this.__mySelectEvent = new MySelect()
        this.__eventsService = new EventsService()
        this.__eventsVideosService = new EventsVideosService()
        this.__videosWrapper = document.querySelector('.events-videos-wrapper__videos')
        this.__videosContainer = this.__videosWrapper.querySelector('.videos-container')

        this.__mySelectEvent.loadSelect('myselect-event')
        this.__mySelectEvent.setOnChange(this.loadVideosEventDataBySelectOption.bind(this))
        this.fillMySelectEvent()
    }

    async loadVideosEventDataBySelectOption(option) {
        const eventId = Object.keys(option)[0]

        const { data: videosData } = await this.__eventsVideosService.getDataByEventId(eventId)

        this.__showVideos(videosData)
    }

    __clearVideos() {
        this.__videosContainer.innerHTML = ''
    }

    __showEventCategory(category) {
        const p = document.createElement('p')
        p.textContent = category
        p.classList.add('h3')

        this.__videosContainer.insertBefore(p, this.__videosContainer.firstChild)
    }

    __getCardVideo(video) {
        const videoFileUrl = `${baseUrl}uploads/events-videos/${video.event_id}/${video.video}`
        const videoElement = document.createElement('video')
        videoElement.src = videoFileUrl
        videoElement.setAttribute('controls', '')

        const date = new Date(video.created_at.date)
        const intLDate = new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        }).format(date)

        const li = document.createElement('li')
        li.classList.add('col')

        li.dataset.videoId = video.id

        li.innerHTML = `<div class="card text-bg-light mb-3">
          <div class="card-body placeholder-glow" style="width: 100rem; max-width: 100%">
            <span class="placeholder col-12" style="height: 15rem"></span>
          </div>
          <div class="card-footer text-body-secondary d-flex justify-content-between align-items-end">
            <div role="button">
              <button class="btn btn-outline-primary btn-sm fullscreen">
                <i class="bi bi-arrows-fullscreen"></i>
              </button>
              <button class="btn btn-outline-dark btn-sm download">
                <i class="bi bi-download"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm delete">
                <i class="bi bi-trash-fill"></i>
              </button>
            </div>
          
            <span>${intLDate}</span>
          </div
        </div>`

        videoElement.addEventListener('loadeddata', () => {
            const cardBody = li.querySelector('.card-body')

            cardBody.classList.remove('placeholder-glow')
            cardBody.querySelector('span').remove()
            cardBody.appendChild(videoElement)
        })

        li.querySelector('button.fullscreen').addEventListener('click', () => {
            videoElement.requestFullscreen()
        })

        li.querySelector('button.download').addEventListener('click', () => {
            const a = document.createElement('a')

            a.href = videoFileUrl
            a.setAttribute('download', 'video')
            a.click()

            a.remove()
        })

        li.querySelector('button.delete').addEventListener('click', () => {
            const modal = document.querySelector('#confirm-delete')
            const modalVideoContainer = modal.querySelector('.modal__video-container')
            const bsModal = bootstrap.Modal.getOrCreateInstance(modal)

            videoElement.style.width = '100%'
            modalVideoContainer.innerHTML = ''
            modalVideoContainer.appendChild(videoElement.cloneNode(true))

            modal.querySelector('button.delete').dataset.videoId = video.id

            bsModal.show()
        })

        return li
    }

    __showCardsVideos(videos) {
        const container = document.createElement('div')
        const ul = document.createElement('ul')

        container.classList.add('container')
        ul.classList.add('row', 'row-cols-3')

        videos.forEach(video => {
            ul.appendChild(this.__getCardVideo(video))
        })

        this.__videosContainer.appendChild(ul)
    }

    __listenConfirmDelete() {
        const modal = document.querySelector('#confirm-delete')
        const deleteButton = modal.querySelector('button.delete')
        const bsModal = bootstrap.Modal.getOrCreateInstance(modal)

        deleteButton.addEventListener('click', async () => {
            const { videoId } = deleteButton.dataset

            if(!videoId) {
                return
            }

            deleteButton.classList.add('disabled', 'pe-none')

            try {
                const data = await this.__eventsVideosService.delete(videoId)

                if(data.success) {
                    bsModal.hide()
                    toastify('Vídeo deletado com sucesso', 'success')
                    document.querySelector(`li[data-video-id="${videoId}"]`).remove()
                    return
                }

                toastify('Não foi possível deletar o vídeo', 'danger')
            } catch(error) {
                console.log(error)
                toastify('Não foi possível deletat o vídeo devido a um erro interno', 'danger')
            }

            deleteButton.classList.remove('disabled', 'pe-none')
        })
    }

    __showVideos(data) {
        this.__clearVideos()
        const noVideosTextElement = this.__videosWrapper.firstChild

        if(data.length === 0) {
            noVideosTextElement.classList.remove('d-none')
            return
        }

        noVideosTextElement.classList.add('d-none')

        this.__showEventCategory(data[0].category)
        this.__showCardsVideos(data)
        this.__listenConfirmDelete()
    }

    __getSelectOptionsByEventData(data) {
        return data.map(event => ({
            value: event.id,
            textContent: event.name
        }))
    }

    async fillMySelectEvent() {
        const { data } = await this.__eventsService.getAll()
        const options = this.__getSelectOptionsByEventData(data)

        this.__mySelectEvent.setOptions(options)
        this.__mySelectEvent.fill()
    }
}