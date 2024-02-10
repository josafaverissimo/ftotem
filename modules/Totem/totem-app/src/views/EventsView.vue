<script setup>
import Header from '@/components/Header.vue'
import EventCard from '@/components/EventCard.vue'
import { useEventsStore } from '@/stores/events.js'
import { computed } from "vue";
import router from "@/router/index.js";

const eventsStore = useEventsStore()
const eventsByCategoriesKeys = computed(() => Object.keys(eventsStore.eventsByCategories))

function logout() {
  eventsStore.$reset()
  router.push({name: 'login'})
}

function getEventImgPath(event) {
  return `${import.meta.env.VITE_BASE_URL}/uploads/events/${event.background}`
}

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
      <div class="actions-buttons-wrapper">
        <button class="btn btn-primary rounded-5" @click="eventsStore.loadEvents"
          :class="!eventsStore.notHasPageToLoad ? '' : 'disabled pe-none'">
          <i class="bi bi-plus-circle fs-4"></i>
        </button>

        <button class="btn btn-dark rounded-5" @click="logout">
          <i class="bi bi-escape fs-5"></i>
        </button>
      </div>

      <div class="container">
        <template v-for="(category, index) in eventsByCategoriesKeys" :key="index">
          <div class="event-category">
            <span class="text-capitalize fs-4">{{category}}</span>
          </div>

          <div class="row row-cols-1 row-cols-lg-3 g-3">
            <template v-for="(event, index) in eventsStore.eventsByCategories[category]" :key="index">
              <EventCard :imgSrc="getEventImgPath(event)" :title="event.name"/>
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


