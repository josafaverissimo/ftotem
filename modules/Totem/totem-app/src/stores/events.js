import {defineStore} from "pinia";
import {getEvents} from "@/services/events.js";

export const useEventsStore = defineStore('events', {
    state: () => ({
        currentEventJson: localStorage.getItem('currentEvent'),
        data: []
    }),
    actions: {
        async loadEvents() {
            const data = await getEvents()

            this.data = data.data
        },
        setCurrentEvent(event) {
            const eventJson = JSON.stringify(event)

            localStorage.setItem('currentEvent', eventJson)
            this.currentEventJson = eventJson
        }
    },
    getters: {
        currentEvent() {
            if(!this.currentEventJson) {
                return null
            }

            return JSON.parse(this.currentEventJson)
        },
        backgroundBaseUrl() {
            return `${import.meta.env.VITE_BASE_URL}/uploads/events`
        }
    }
})