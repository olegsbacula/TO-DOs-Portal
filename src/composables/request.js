
import axios from "axios";


export function getFirstTodo(id) {
  return axios
    .get(`http://localhost:8080/gettodo/${id}`)
    .then(response => {
      const { UserId, TaskID, Title, Completed } = response.data

      console.log('UserId:',    UserId)
      console.log('TaskID:',    TaskID)
      console.log('Title:',     Title)
      console.log('Completed:', Completed)

      return { UserId, TaskID, Title, Completed }
    })
    .catch(err => {
      console.error('Request error:', err)
      throw err
    })
}