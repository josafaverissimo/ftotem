<script setup>
const props = defineProps(['imgSrc', 'title'])
</script>

<template>
  <div class="event-card-wrapper">
    <span class="title text-capitalize">{{props.title}}</span>

    <div class="img-wrapper shadow-lg">
      <img :src="props.imgSrc" alt="event image" loading="lazy"/>
    </div>
  </div>
</template>

<style scoped>
.event-card-wrapper {
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
    object-fit: contain;
    border-radius: 1rem;
    cursor: pointer;

    img {
      width: 25rem;
      max-height: 17rem;
      object-fit: contain;
      border-radius: 1rem;
      padding: .5rem;
    }
  }
}
</style>