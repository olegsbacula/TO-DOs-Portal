// src/stores/todosStore.js
import { defineStore }    from 'pinia'
import { ref }            from 'vue'
import { getAllTodos }    from '../composables/getall.js'
import {deleteTodo} from '../composables/delete.js'
import { postANewTodo }   from '../composables/add.js'

export const useTodosStore = defineStore('todos', () => {
  const todos         = ref([])
  const initialFilled = ref(false)


  async function loadTodos(force = false) {
    if (initialFilled.value && !force) {
      return todos.value
    }
    try {
      const data = await getAllTodos()
      if (Array.isArray(data)) {
        todos.value        = data
        initialFilled.value = true
      }
    } catch (err) {
      console.error('Failed to load todos:', err)
    }
    return todos.value
  }

  
  async function addATodo(payload) {
    try {
      const { UserId, TaskID, Title, Completed } = payload
      const created = await postANewTodo(UserId, TaskID, Title, Completed)
      todos.value.push(created)
      return created
    } catch (err) {
      console.error('Store failed to create a To Do:', err)
      throw err
    }
  }
  
async function deleteATodo(taskID) {
  try {
    await deleteTodo(taskID)
    todos.value = todos.value.filter(todo => todo.TaskID !== taskID)
  } catch (err) {
    console.error('Store failed to delete To Do:', err)
    throw err
  }
}

  return {
    todos,
    loadTodos,
    addATodo,
    deleteATodo
  }
})
