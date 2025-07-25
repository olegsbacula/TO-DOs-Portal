import axios from 'axios'

/**
 * Create a new task.
 *
 * @param {number} userId    — User's ID 
 * @param {number} taskId    — Task's ID 
 * @param {string} title     — Task's Title
 * @param {boolean} completed — Completion Flag
 */
export async function postANewTodo(userId, taskId, title, completed) {
  try {
    const res = await axios.post ('http://localhost:8080/posttodo', {
      UserId:    userId,
      TaskID:    taskId,
      Title:     title,
      Completed: completed,
    })
    return res.data
  } catch (err) {
    console.error('Failed to create TODO:', err)
    throw err
  }
}
