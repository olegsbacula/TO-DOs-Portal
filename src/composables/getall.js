import axios from 'axios'

export async function getAllTodos() {
  return axios
    .get('http://localhost:8080/listall')
    .then(response => {
      console.log('All todos:', response.data)
      return response.data
    })
    .catch(err => {
      console.error('Request error:', err)
      throw err
    })
}
