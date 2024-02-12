<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['imgSrc', 'title', 'clients'])

const tooltips = ref([])

onMounted(() => {
  tooltips.value.forEach(tooltipElement => {
    new bootstrap.Tooltip(tooltipElement)
  })
})

</script>

<template>
  <div class="event-card-wrapper">
    <div class="img-title-wrapper">
      <span class="title text-capitalize">{{props.title}}</span>

      <div class="img-wrapper shadow">
        <img :src="props.imgSrc" alt="event image" loading="lazy"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card-wrapper {
  .img-title-wrapper {
    object-fit: contain;
    cursor: pointer;
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
      width: 20rem;
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