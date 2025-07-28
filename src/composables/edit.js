import axios from 'axios'

/**
 * Update Task's .
 * 
 * @param {string} taskId - Task's ID 
 * @param {Object} updatedTodo -  Task's todo update
 * @returns {Promise<string>}
 */
export async function editTodo(taskId, updatedTodo) {
  try {
    const res = await axios.patch(`http://localhost:8080/edit/${taskId}`, updatedTodo)
    return res.data
  } catch (err) {
    console.error('Failed to edit TODO:', err)
    throw err
  }
}
