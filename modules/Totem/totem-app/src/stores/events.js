import {defineStore} from "pinia";
import {getEvents} from "@/services/events.js";

export const useEventsStore = defineStore('events', {
    state: () => ({
        data: []
    }),
    actions: {
        async loadEvents() {
            const data = await getEvents()

            this.data = [...this.data, ...data.data]
        },
    }
})