<script setup>
import { ref } from 'vue'
import { getFirstTodo } from '../composables/request.js'
import { useTodosStore } from '../stores/todosStore'

const todo = ref(null)
const id = ref(1)
const store = useTodosStore()
store.loadTodos()
async function loadTodo() {
  try {
    const data = await getFirstTodo(id.value)
    todo.value = data
  } catch (e) {
    console.error('Error while loading a to-do:', e)
  }
}
</script>

<template>
  
<div class="parent">
    <div class="div1">
      <h2>ToDos With API </h2>
      </div>
    <div class="div2"> 
      <table border="1" cellspacing="0" cellpadding="8">
    <thead>
      <tr>
        <th>User ID</th>
        <th>Task ID</th>
        <th>Title</th>
        <th>Completed</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo in store.todos" :key="todo.TaskID">
        <td>{{ todo.UserId }}</td>
        <td>{{ todo.TaskID }}</td>
        <td>{{ todo.Title }}</td>
        <td>{{ todo.Completed }}</td>
      </tr>
    </tbody>
  </table>
</div>
    <div class="div3">
      <button>Add A TO DO</button>
    </div>
    <div class="div4"><button>Delete A TO DO</button></div>
    <div class="div5"><button>Edit A TO DO</button></div>
    <div class="div6">
      <p>Add Form will be here</p>
    </div>
    <div class="div7">Edit Form will be here</div>
</div>
    
</template>

<style scoped>

.parent {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 8px;
}
    
.div1 {
    grid-column-start: 3;
}

.div2 {
    grid-column-start: 3;
    grid-row-start: 2;
}

.div3 {
    grid-column-start: 2;
    grid-row-start: 3;
}

.div4 {
    grid-column-start: 3;
    grid-row-start: 3;
}

.div5 {
    grid-column-start: 4;
    grid-row-start: 3;
}

.div6 {
    grid-column-start: 2;
    grid-row-start: 4;
}

.div7 {
    grid-column-start: 4;
    grid-row-start: 4;
}
        
        
</style>
