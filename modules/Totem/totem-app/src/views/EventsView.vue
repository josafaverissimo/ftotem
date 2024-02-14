<script setup>
import Header from '@/components/Header.vue'
import EventCard from '@/components/EventCard.vue'
import EventsClientsTable from '@/components/EventClientsTable.vue'
import MySelect from '@/components/MySelect.vue'
import { logout } from "@/services/auth.js";
import { useEventsStore } from '@/stores/events.js'
import { computed, reactive } from "vue";

const eventsStore = useEventsStore()
const eventsOptions = computed(() => eventsStore.data.map((event, index) => ({
  value: index,
  textContent: event.name,
  category: event.category
})))
const currentEventImg = computed(() => {
  const eventBackground = eventsStore.currentEvent.background

  return eventBackground ? `${import.meta.env.VITE_BASE_URL}/uploads/events/${eventBackground}` : ''
})
const eventsClientsRows = computed(() => {
  const clients = eventsStore.currentEvent.clients?.split(', ')

  return clients || ['Nenhum cliente na lista.']
})

function setCurrentEventByOptionValue(option) {
  eventsStore.setCurrentEvent(eventsStore.data[option.value])
}

eventsStore.loadEvents()

</script>

<template>
  <div class="wrapper">
    <div class="actions-buttons-wrapper">
      <button class="btn btn-dark rounded-5" @click="logout">
        <i class="bi bi-escape fs-5"></i>
      </button>
    </div>

    <Header class="animate__animated animate__fadeInDown">
      <h1 class="display-2 fw-bolder">Eventos</h1>
    </Header>

    <div class="event-wrapper animate__animated animate__fadeInRight">

      <div class="container">
        <div class="event-metadata-wrapper">
          <div class="event-category">
            <span class="text-capitalize h2 animate__animated animate__fadeIn" v-if="eventsStore.currentEvent">
              {{eventsStore.currentEvent.category}}
            </span>
          </div>

          <MySelect :options="eventsOptions" @change="setCurrentEventByOptionValue"/>
        </div>

        <template v-if="eventsStore.currentEvent">
          <div class="event-data-wrapper">
            <EventCard :imgSrc="currentEventImg" :title="eventsStore.currentEvent.name"
              class="animate__animated animate__fadeInUp"/>
            <EventsClientsTable :clients="eventsClientsRows"/>
          </div>
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

  .actions-buttons-wrapper {
    position: absolute;
    z-index: 1000;
    bottom: 10px;
    right: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .event-wrapper {
    height: 100%;
    overflow-y: scroll;

    .event-metadata-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      padding: .5rem;
      margin: .5rem 0;
    }

    .event-data-wrapper {
      display: flex;

      :first-child {
        flex-basis: 70%;
      }
      :last-child {
        flex-basis: 30%;
      }
    }

    @media (max-width: 991px) {
      .event-metadata-wrapper {
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .event-data-wrapper {
        flex-direction: column;
        gap: 1.5rem;
      }
    }
  }
}
</style>


