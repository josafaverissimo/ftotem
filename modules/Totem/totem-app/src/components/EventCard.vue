<script setup>
import { computed } from "vue";
import { useEventsStore } from "@/stores/events.js";

const props = defineProps(['event'])

const eventsStore = useEventsStore()

const eventImg = computed(() => {
  return `${eventsStore.backgroundBaseUrl}/${props.event.background}`
})

const eventLink = computed(() => {
  return `/event/${props.event.hash}`
})

</script>

<template>
  <div class="event-card-wrapper">
    <div class="img-title-wrapper">
      <span class="title text-capitalize">{{props.event.name}}</span>

      <div class="img-wrapper shadow">
        <router-link :to="eventLink" class="text-decoration-none">
          <img :src="eventImg" alt="event image" loading="lazy"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card-wrapper {
  .img-title-wrapper {
    object-fit: contain;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      background-color: #2f2f2f;
      color: #fff;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
      padding: .5rem 1rem;
      text-align: center;
      width: 80%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      box-shadow: 1px 1px 16px #0002;
      position: relative;
      z-index: -1;
    }

    .img-wrapper {
      border-radius: 1rem;
      background-color: #fff;
      width: 90%;

      img {
        width: 100%;
        max-height: 40rem;
        object-fit: contain;
        border-radius: 1rem;
        padding: .5rem;
      }
    }
  }
}
</style>