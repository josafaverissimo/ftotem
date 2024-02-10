<script setup>
import Header from '@/components/Header.vue'
import EventCard from '@/components/EventCard.vue'
import { useEventsStore } from '@/stores/events.js'
import { computed } from "vue";

const eventsStore = useEventsStore()
const eventsByCategoriesKeys = computed(() => Object.keys(eventsStore.eventsByCategories))

eventsStore.loadEvents()

</script>

<template>
  <div class="wrapper">
    <div>
      <Header>
        <h1 class="display-2 fw-bolder">Eventos</h1>
      </Header>

      <hr>
    </div>

    <div class="events-wrapper">
      <div class="load-button-wrapper" v-if="!eventsStore.notHasPageToLoad">
        <button class="btn btn-primary rounded-5" @click="eventsStore.loadEvents">
          <i class="bi bi-plus-circle fs-4"></i>
        </button>
      </div>

      <div class="container">
        <template v-for="(category, index) in eventsByCategoriesKeys" :key="index">
          <div class="event-category">
            <span class="text-capitalize fs-4">{{category}}</span>
          </div>

          <div class="row row-cols-3 g-3">
            <template v-for="(event, index) in eventsStore.eventsByCategories[category]" :key="index">
              <EventCard :imgSrc="`http://localhost:8080/uploads/events/${event.background}`" :title="event.name"/>
            </template>
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

  hr {
    margin: 0;
  }

  .events-wrapper {
    height: 100%;
    overflow-y: scroll;

    .event-category {
      border-bottom: 1px solid #e0e0e0;
      margin: 1rem 0;
    }

    .load-button-wrapper {
      position: absolute;
      bottom: 2rem;
      right: 5rem;
    }
  }
}
</style>


