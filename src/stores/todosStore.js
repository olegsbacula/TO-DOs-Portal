// src/stores/todosStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAllTodos    } from '../composables/getall.js'
import { PostANewToDO   } from '../composables/add.js'
export const useTodosStore = defineStore('todos', () => {

  const todos         = ref([])
  const initialFillUp = ref(false)

  async function loadTodos() {
    if (initialFillUp.value && !force) {
      return todos.value
    }
    try {
      const data = await getAllTodos()
      if (Array.isArray(data)) {
        todos.value        = data
        initialFillUp.value = true
      }
    } catch (err) {
      console.error('Failed to load todos:', err)
    }
  }
  
  async function addATodo() {
    try {
      const created = await PostANewToDO(UserId, TaskID, Title, Completed)
      todos.value.push(created)
      return created
    } catch (err) {
      console.error('Store failed to create a To Do:', err)
    throw err
    }
  }

   return {
    todos,
    initialFillUp,
    loadTodos,
    addATodo,
  }
})
