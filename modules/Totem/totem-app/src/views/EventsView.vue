<script setup>
import Header from '@/components/Header.vue'
import EventCard from '@/components/EventCard.vue'
import EventsClientsTable from '@/components/EventClientsTable.vue'
import MySelect from '@/components/MySelect.vue'
import { useEventsStore } from '@/stores/events.js'
import { computed, reactive } from "vue"

const eventsStore = useEventsStore()
const eventsOptions = computed(() => eventsStore.data.map((event, index) => ({
  value: index,
  textContent: event.name,
  category: event.category
})))
const eventsClientsRows = computed(() => {
  const clients = eventsStore.currentEvent?.clients?.split(', ')

  return clients || ['Nenhum cliente na lista.']
})

function setCurrentEventByOptionValue(option) {
  eventsStore.setCurrentEvent(eventsStore.data[option.value])
}

eventsStore.loadEvents()

</script>

<template>
  <div class="wrapper">
    <Header class="animate__animated animate__fadeInDown">
      <h1 class="display-2 fw-bolder">Eventos</h1>
    </Header>

    <div class="event-wrapper animate__animated animate__fadeInRight">
      <div class="container">
        <div class="event-metadata-wrapper" :class="eventsStore.currentEvent ? 'splitThem' : ''">
          <div class="event-category"
            :class="eventsStore.currentEvent ? '' : 'd-none'">
            <span class="text-capitalize h2 animate__animated animate__fadeIn" v-if="eventsStore.currentEvent">
              {{eventsStore.currentEvent.category}}
            </span>
          </div>

          <div>
            <MySelect :style="{minWidth: '100%'}" :options="eventsOptions" @change="setCurrentEventByOptionValue"/>
          </div>
        </div>

        <template v-if="eventsStore.currentEvent">
          <div class="event-data-wrapper">
            <EventCard :event="eventsStore.currentEvent"
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

    .event-metadata-wrapper:has(.event-category.d-none) {
      justify-content: center;
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


