const express = require("express");
const notesJSON = require("./data/db.json");
const notes = notesJSON.notes;
const app = express();
const cors = require("cors");

/* Variable de configuracion para definir la variable que va a contener el valor 
 * del puerto donde se va a ejecutar el servidor*/
app.set("port", 3001);

/* middlewares */
app.use(express.json());
app.use(cors());
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



app.listen(app.get("port"));
console.log("El servidor esta prendido en el puerto 3001");
