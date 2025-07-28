import axios from 'axios'

/**
 * Delete task.
 *
 * @param {string} taskId - Task's ID
 * @returns {Promise<string>}
 */
export async function deleteTodo(taskId) {
  try {
    const res = await axios.delete(`http://localhost:8080/delete/${taskId}`)
    return res.data
  } catch (err) {
    console.error('Failed to delete TODO:', err)
    throw err
  }
}
