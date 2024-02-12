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
    <div class="body">
      <div class="img-title-wrapper">
        <span class="title text-capitalize">{{props.title}}</span>

        <div class="img-wrapper shadow">
          <img :src="props.imgSrc" alt="event image" loading="lazy"/>
        </div>
      </div>

      <div class="action-wrapper">
        <div class="table-wrapper">
          <span class="h2 text-center w-100">Lista de clientes</span>

          <table class="table">
            <thead>
              <tr>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(client, index) in clients" :key="index">
                <td class="text-capitalize truncate" data-bs-toggle="tooltip" data-bs-placement="bottom"
                  :data-bs-title="client" ref="tooltips">
                  {{client}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-card-wrapper {
  .body {
    width: 100%;
    display: flex;

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

    .action-wrapper {
      flex-grow: 1;

      .table-wrapper {
        margin: 0 1rem;
        display: flex;
        flex-direction: column;

        .truncate {
          max-width: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>