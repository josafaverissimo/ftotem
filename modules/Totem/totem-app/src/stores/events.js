import {defineStore} from "pinia";
import {getEvents} from "@/services/events.js";

export const useEventsStore = defineStore('events', {
    state: () => ({
        currentEvent: null,
        data: []
    }),
    actions: {
        async loadEvents() {
            const data = await getEvents()

            this.data = data.data
        },
        setCurrentEvent(event) {
            this.currentEvent = event
        }
    },
    getters: {
        backgroundBaseUrl() {
            return `${import.meta.env.VITE_BASE_URL}/uploads/events`
        }
    }
})