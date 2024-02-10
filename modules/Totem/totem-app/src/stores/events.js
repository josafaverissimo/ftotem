import {defineStore} from "pinia";
import {getEvents} from "@/services/events.js";

export const useEventsStore = defineStore('events', {
    state: () => ({
        currentPage: 1,
        pageCount: null,
        data: []
    }),
    actions: {
        async loadEvents() {
            if(this.notHasPageToLoad) {
                return
            }

            const data = await getEvents(this.currentPage++)

            this.pageCount = data.pageCount
            this.data = [...this.data, ...data.data]
        },
    },
    getters: {
        eventsByCategories() {
            return this.data.reduce((eventsByCategories, event) => {
                if(!eventsByCategories[event.category]) {
                    eventsByCategories[event.category] = []
                }

                eventsByCategories[event.category].push(event)

                return eventsByCategories
            }, {})
        },
        notHasPageToLoad() {
            return this.pageCount !== null && this.currentPage > this.pageCount
        }
    }
})