const express = require("express");
const notesJSON = require("./data/db.json");
const notes = notesJSON.notes;
const app = express();
const cors = require("cors");

/* middlewares */
app.use(express.json());

app.use(cors({
    origin: "*", // Permitir cualquier dominio
}));


/* Solicitudes o rutas*/

app.get("/api/notes", (request, response) => {
  response.json(notes);
})

app.post("/api/notes", (request, response) => {
  const newNote = request.body;
  newNote.id = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) + 1 : 1;
  notes.push(newNote);
  response.json(notes)
})

app.put("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const updateNote = request.body;
  const noteFind = notes.find((note) => {
    return note.id === id
  })

  if (!noteFind) {
    return response.status(404).json({
      message: "la nota que se quiere actualizar no se encuentra dentro del sistama lo sentimos intentalo de nuevo"
    })
  }

  const updateNoteIndex = notes.findIndex(note => note.id === id);
  notes[updateNoteIndex] = {...notes[updateNoteIndex], ...updateNote};
  response.json(notes);
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
