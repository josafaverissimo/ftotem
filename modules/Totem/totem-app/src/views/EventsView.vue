<script setup>
import Header from '@/components/Header.vue'
import EventCard from '@/components/EventCard.vue'
import MySelect from '@/components/MySelect.vue'
import router from "@/router/index.js";
import { useEventsStore } from '@/stores/events.js'
import { computed, reactive } from "vue";

const eventsStore = useEventsStore()
const currentEvent = reactive({
  data: null
})
const eventsOptions = computed(() => eventsStore.data.map((event, index) => ({
  value: index,
  textContent: event.name
})))
const currentEventImg = computed(() =>
    `${import.meta.env.VITE_BASE_URL}/uploads/events/${currentEvent.data.background}`)

function logout() {
  eventsStore.$reset()
  router.push({name: 'login'})
}

function setCurrentEventByOptionValue(option) {
  currentEvent.data = eventsStore.data[option.value]
}

eventsStore.loadEvents()

</script>

<template>
  <div class="wrapper">
    <Header>
      <h1 class="display-2 fw-bolder">Eventos</h1>
    </Header>

    <div class="events-wrapper">
      <div class="actions-buttons-wrapper">
        <button class="btn btn-dark rounded-5" @click="logout">
          <i class="bi bi-escape fs-5"></i>
        </button>
      </div>

      <div class="container">
        <div class="event-metadata-wrapper">
          <div class="event-category">
            <span class="text-capitalize fs-4" v-if="currentEvent.data">{{currentEvent.data.category}}</span>
          </div>

          <MySelect :options="eventsOptions" @change="setCurrentEventByOptionValue"/>
        </div>

        <template v-if="currentEvent.data">
          <EventCard :imgSrc="currentEventImg" :title="currentEvent.data.name"/>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .events-wrapper {
    height: 100%;
    overflow-y: scroll;

    .event-metadata-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: .5rem;
      margin: .5rem 0;
    }

    .actions-buttons-wrapper {
      position: absolute;
      bottom: 10px;
      right: 25px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>


