import {defineStore} from "pinia";
import {getEvents} from "@/services/events.js";

export const useEventsStore = defineStore('events', {
    state: () => ({
        data: []
    }),
    actions: {
        getEvents() {
            getEvents()
        }
    }
})