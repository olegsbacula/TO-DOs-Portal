// src/components/PrintJson.vue
<script setup>
import { ref, onMounted } from 'vue'
import { useTodosStore }  from '../stores/todosStore'
import { editTodo }       from '../composables/edit.js'
import { deleteTodo } from '../composables/delete.js'

const store        = useTodosStore()
const newTodo      = ref({ UserId: null, TaskID: null, Title: '', Completed: false })
const updatedTodo  = ref({ UserId: '', TaskID: '', Title: '', Completed: false })
const deleteID     = ref('')

onMounted(() => {
  store.loadTodos()
})

async function addTodo() {
  await store.addATodo(newTodo.value)
  newTodo.value = { UserId: '', TaskID: '', Title: '', Completed: false }
}

async function editTodoHandler() {
  try {
    await editTodo(updatedTodo.value.TaskID, updatedTodo.value)
    await store.loadTodos(true)
  } catch (err) {
    console.log("Error while editing: ",err)
  }
}
</script>
<template>
  <div class="container">
   
    <header class="header">
      <h1>My To-Do List</h1>
      <p>Stay organized and productive with our simple to-do app.</p>
    </header>

    
    <aside class="sidebar">
      
      <section class="card">
        <h2>Add a New To-Do</h2>
        <label>User ID</label>
        <input type="text" v-model="newTodo.UserId" placeholder="Enter User ID" />

        <label>Task ID</label>
        <input type="text" v-model="newTodo.TaskID" placeholder="Enter Task ID" />

        <label>Title</label>
        <input type="text" v-model="newTodo.Title" placeholder="Enter Title" />

        <label class="checkbox">
          <input type="checkbox" v-model="newTodo.Completed" />
          Completed
        </label>

        <button class="btn add" @click="addTodo">
          Add To-Do
        </button>
      </section>

      
      <section class="card">
        <h2>Edit To-Do</h2>
        <label>User ID</label>
        <input type="text" v-model="updatedTodo.UserId" placeholder="Enter User ID" />

        <label>Task ID</label>
        <input type="text" v-model="updatedTodo.TaskID" placeholder="Enter Task ID" />

        <label>Title</label>
        <input type="text" v-model="updatedTodo.Title" placeholder="Enter Title" />

        <label class="checkbox">
          <input type="checkbox" v-model="updatedTodo.Completed" />
          Completed
        </label>

        <button class="btn edit" @click="editTodoHandler">
          Update To-Do
        </button>
      </section>

      
      <section class="card">
        <h2>Delete To-Do</h2>
        <label>Task ID</label>
        <input type="text" v-model="deleteID" placeholder="Enter Task ID" />

        <button class="btn del" @click="store.deleteATodo(deleteID)">
          Delete To-Do
        </button>
      </section>
    </aside>

    <main class="main">
      <h2>To-Dos with Go API</h2>
      <div class="table-wrapper">
        <table>
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
              <td>
                <span
                  :class="['status', todo.Completed ? 'done' : 'not']">
                  {{ todo.Completed }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>

.container {
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-template-rows:
    auto     
    1fr      
    ;
  gap: 24px;
  padding: 24px;
  background-color: #e2ecf5;
  min-height: 100vh;
}


.header {
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 16px;
}
.header h1 {
  margin: 0;
  font-size: 2rem;
  color: #1f2d3d;
}
.header p {
  margin: 4px 0 0;
  color: #6b7c93;
}


.sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}
.card h2 {
  margin-top: 0;
  font-size: 1.1rem;
  color: #1f2d3d;
}
.card label {
  display: block;
  margin-top: 12px;
  font-size: 0.9rem;
  color: #4a5568;
}
.card input[type="text"] {
  width: 90%;
  margin-top: 4px;
  padding: 8px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 0.9rem;
}


.checkbox {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.checkbox input {
  margin-right: 8px;
}


.btn {
  width: 100%;
  padding: 10px;
  margin-top: 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}
.btn.add {
  background-color: #5c3bfe;
  color: #fff;
}
.btn.add:hover { background-color: #4a2ed6; }

.btn.edit {
  background-color: #22c55e;
  color: #fff;
}
.btn.edit:hover { background-color: #16a34a; }

.btn.del {
  background-color: #ef4444;
  color: #fff;
}
.btn.del:hover { background-color: #dc2626; }


.main {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
}
.main h2 {
  margin: 0 0 16px;
  font-size: 1.2rem;
  color: #1f2d3d;
}

/* Таблица */
.table-wrapper {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: left;
  font-size: 0.9rem;
  color: #334155;
}
thead {
  background-color: #f1f5f9;
}
th {
  font-weight: 600;
  color: #475569;
}
tr + tr td {
  border-top: 1px solid #e2e8f0;
}

/* Статус */
.status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
}
.status.done {
  background-color: #dcfce7;
  color: #166534;
}
.status.not {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>