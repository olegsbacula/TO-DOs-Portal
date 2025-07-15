import axios from "axios";

export async function PostANewToDO(UserId, TaskId, Title, Completed){
    try{
const res = await axios.post('http://localhost:8080/posttodo', { 
      UserId: userId,
      TaskID: taskId,
      Title: title,
      Completed: completed});
return res.data;
    }
catch (err) {
    console.error('Failed to create TODO:', err);
    throw err;
  }
}