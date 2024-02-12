<script setup>
import {computed, reactive, ref} from 'vue'

const props = defineProps(['options'])
const emit = defineEmits(['change'])

const currentOption = reactive({
  option: {
    value: '',
    textContent: ''
  }
})
const searchInputValue = ref('')
const searchedOptions = computed(() => {
  if(searchInputValue === '') {
    return props.options
  }

  return props.options.filter(option => {
    const optionTextContent = removeAccents(option.textContent).toLocaleLowerCase()
    const search = removeAccents(searchInputValue.value).toLocaleLowerCase()

    return optionTextContent.indexOf(search) !== -1
  })
})

const selectElement = ref(null)
const optionsElements = ref([])
const readonlySelectedOptionInputElement = ref(null)
const listElement = ref(null)
const searchInputElement = ref(null)

function showOptions() {
  listElement.value.classList.add('d-block')
  searchInputElement.value.focus()
}

function hideOptions() {
  setTimeout(() => {
    listElement.value.classList.remove('d-block')
  }, 100)
}

function unselectAll() {
  selectElement.value.value = ""
  selectElement.value.querySelectorAll('option[selected]').forEach(option =>
      option.removeAttribute('selected'))
  listElement.value.querySelectorAll('ul li.selected').forEach(li => li.classList.remove('selected'))
}

function change(event, option) {
  unselectAll()

  currentOption.option = option

  event.target.classList.add('selected')
  readonlySelectedOptionInputElement.value.value = option.textContent

  const selectOptionElement = optionsElements.value.find(optionElement => Number(optionElement.value) === option.value)
  selectOptionElement.setAttribute('selected', '')
  selectOptionElement.parentNode.value = option.value

  emit('change', option)
}

function removeAccents(string) {
  return string
    .replace(/[àáâã]/g, "a")
    .replace(/[éê]/g, "e")
    .replace(/í/g, "i")
    .replace(/[óôõ]/g, "o")
    .replace(/ú/g, "u")
    .replace(/ç/g, "c")
    .replace(/[ÀÁÂÃ]/g, "A")
    .replace(/[ÉÊ]/g, "E")
    .replace(/Í/g, "I")
    .replace(/[ÓÔÕ]/g, "O")
    .replace(/ÚÜ/g, "U")
    .replace(/Ç/g, "C")
}

</script>

<template>
  <div class="my-select">
    <select ref="selectElement">
      <option selected disabled></option>
      <option v-for="(option, key) in props.options" :key="key" :value="option.value" ref="optionsElements">
        {{option.textContent}}
      </option>
    </select>

    <div class="input-group input-group-lg">
      <input type="text" class="form-control" placeholder="e.g: Casamento" readonly @focus="showOptions"
        ref="readonlySelectedOptionInputElement">
    </div>

    <div class="list" ref="listElement">
      <label>
        <i class="bi bi-search icon"></i>
        <input type="search" ref="searchInputElement" @blur="hideOptions" v-model="searchInputValue">
      </label>

      <ul>
        <template v-for="(option, key) in searchedOptions" :key="key">
          <li :value="option.value" @mousedown="change($event, option)"
            :class="currentOption.option.value === option.value ? 'selected' : ''">
            {{option.textContent}}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.my-select {
  position: relative;

  select {
    display: none;
  }

  .list {
    display: none;
    position: absolute;
    z-index: 2000;
    width: 100%;
    background-color: #fff;
    box-shadow: 1px 1px 16px #0003;
    margin-top: .3rem;
    border-radius: .5rem;

    li {
      padding: .5rem 2rem;
      cursor: pointer;
      transition: all .1s;
    }

    li:hover {
      background-color: #6c757d;
      color: #fff;
    }

    li.selected {
      background-color: #6c757d;
      color: #fff;
    }

    label {
      display: flex;
      padding: 0.5rem 1rem;
      margin: 0.5rem 2rem;
      border-radius: 2rem;
      box-shadow: 1px 1px 16px #0002;
    }

    label .icon {
      font-size: 1.5rem;
      padding-right: .3rem;
    }

    input[type="search"] {
      background: transparent;
      border: none;
      outline: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #8e8e8e;
      flex-grow: 1;
      width: 100%;
    }

    ul {
      padding: 0;
      list-style: none;
      max-height: 10rem;
      overflow-y: auto;
    }
  }
}
</style>