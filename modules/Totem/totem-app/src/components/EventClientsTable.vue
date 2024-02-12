<script setup>
const props = defineProps(['clients'])
</script>

<template>
  <div class="table-wrapper">
    <span class="h2 text-center w-100">Lista de clientes</span>

    <div class="table-container">
      <table class="table table-striped w-100">
        <thead>
        <tr>
          <th>Nome</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(client, index) in props.clients" :key="index">
          <td class="text-capitalize truncate" data-bs-toggle="tooltip" data-bs-placement="bottom"
              :data-bs-title="client" ref="tooltips">
            {{client}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  margin: 0 1rem;
  display: flex;
  flex-direction: column;

  .table-container {
    height: 40rem;
    overflow-y: auto;
  }

  .truncate {
    max-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>