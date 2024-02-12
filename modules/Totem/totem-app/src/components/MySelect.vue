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
const optionsByCategory = computed(() => searchedOptions.value.reduce((optionsByCategory, option) => {
  if(!optionsByCategory[option.category]) {
    optionsByCategory[option.category] = [option]

    return optionsByCategory
  }

  optionsByCategory[option.category].push(option)

  return optionsByCategory
}, {}))
const optionsByCategoryKeys = computed(() => Object.keys(optionsByCategory.value))

const mySelectPlaceholderElement = ref(null)
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
  mySelectPlaceholderElement.value.classList.add('filled')

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

    <label class="readonly-input">
      <span class="my-select-placeholder" ref="mySelectPlaceholderElement">Selecione um Evento</span>

      <input type="text" class="form-control form-control-lg" readonly @focus="showOptions"
        ref="readonlySelectedOptionInputElement">
    </label>

    <div class="list" ref="listElement">
      <label>
        <i class="bi bi-search icon"></i>
        <input type="search" ref="searchInputElement" @blur="hideOptions" v-model="searchInputValue">
      </label>

      <ul class="container">
        <template v-for="(category, key) in optionsByCategoryKeys" :key="key">
          <li class="category">
            <span class="fw-bold">{{category}}</span>
            <ul>
              <template v-for="(option, key) in optionsByCategory[category]">
                <li :value="option.value" @mousedown="change($event, option)" class="item"
                  :class="currentOption.option.value === option.value ? 'selected' : ''">
                  {{option.textContent}}
                </li>
              </template>
            </ul>
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

  .readonly-input {
    cursor: text;
  }

  .my-select-placeholder {
    position: relative;
    top: 2rem;
    left: 0.625rem;
    transition: all .25s ease-in-out;
  }
  .my-select-placeholder.filled {
    top: 0;
    left: 0;
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

    ul {
      list-style: none;
      padding: 0;
    }

    ul.container {
      max-height: 10rem;
      overflow-y: auto;
    }


    li.category span {
      pointer-events: none;
      display: block;
      text-indent: .625rem;
    }

    li.item {
      width: 100%;
      padding: .5rem 2rem;
      cursor: pointer;
      transition: all .1s;
    }

    li.item:hover {
      background-color: #6c757d;
      color: #fff;
    }

    li.item.selected {
      background-color: #6c757d;
      color: #fff;
    }

    label {
      display: flex;
      padding: 0.5rem 1rem;
      margin: 0.5rem 2rem;
      border-radius: 2rem;
      box-shadow: 1px 1px 16px #0002;

      .icon {
        font-size: 1.5rem;
        padding-right: .3rem;
      }
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
  }
}
</style>