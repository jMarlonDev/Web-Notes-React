
import axios from "axios";

const urlNotes = "http://localhost:3001/api/notes";

async function getAllNotes (){
  const request = axios.get(urlNotes);
  return await request.then(response => response.data);

}

async function createNote (newNote) {
  const request = axios.post(urlNotes, newNote)
  return await request.then(response => response.data);
}

async function updateNote (id , newNote){
  const request = axios.put(`${urlNotes}/${id}`, newNote);
  return await request.then(response => response.data)
}

export default {
  getAllNotes : getAllNotes,
  createNote: createNote,
  updateNote: updateNote
}
