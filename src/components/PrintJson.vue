<script setup>
import { ref, onMounted } from 'vue'
import { useTodosStore }  from '../stores/todosStore'

const store   = useTodosStore()
const newTodo = ref({ UserId: null, TaskID: null, Title: '', Completed: false })

onMounted(() => {
  store.loadTodos()
})

async function addTodo() {
  await store.addATodo(newTodo.value)
  newTodo.value = { UserId: '', TaskID: '', Title: '', Completed: false }
}

</script>

<template>
  <div class="parent">
    <div class="div1">
      <button @click="addTodo">Add A TO DO</button>
    </div>

    <div class="div2">
      <div class="todo-container">
        <!-- Form to add a new todo -->
        <form class="todo-form">
          <div>
            <label for="userId">User ID:</label>
            <input
              id="userId"
              type="text"
              v-model="newTodo.UserId"
              required
            />
          </div>

          <div>
            <label for="taskId">Task ID:</label>
            <input
              id="taskId"
              type="text"
              v-model="newTodo.TaskID"
              required
            />  
          </div>

          <div>
            <label for="title">Title:</label>
            <input
              id="title"
              type="text"
              v-model="newTodo.Title"
              required
            />
          </div>

          <div>
            <label for="completed">Completed:</label>
            <input
              id="completed"
              type="checkbox"
              v-model="newTodo.Completed"
            />
          </div>
        </form>
      </div>
    </div>

    <div class="div3">
      <button>Delete A TO DO</button>
    </div>

    <div class="div4">
      <button>Edit A TO DO</button>
    </div>

    <div class="div5">
      add a form to edit a to do
    </div>

    <div class="div6">
      <h2>ToDos with Go API</h2>
    </div>

    <div class="div7">
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
  </div>
</template>


<style scoped>
.parent {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows:
    auto       /* div1: Add button */
    180px      /* div2: Delete form */
    auto       /* div3: Delete button */
    auto       /* div4: Edit button */
    180px      /* div5: Edit form */
    auto       /* возможно футер или ещё элемент */
    300px;     /* div7: Список */
  gap: 16px;
}

.div1 { grid-column: 1; grid-row: 1; }
.div2 { grid-column: 1; grid-row: 2; }
.div3 { grid-column: 1; grid-row: 3; }
.div4 { grid-column: 1; grid-row: 4; }
.div5 { grid-column: 1; grid-row: 5; }
.div6 { grid-column: 2; grid-row: 1; }

.div7 {
  grid-column: 2;
  grid-row: 2 / span 5; /* растягивается по высоте */
  margin-top: 0;
  overflow: auto;
}

.parent > * {
  border: 1px solid #000;
  padding: 8px;
  background: #222;
  color: #eee;
  border-radius: 6px;
}

.div2, .div5 {
  background: #333;
}

</style>
