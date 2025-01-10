import './App.css'
import Note from './components/note'
import { useState, useEffect } from 'react'
import noteService from './services/notes';
function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");

  /* aquí se va a definir el estado correspondiente que va a cambiar el valor de la variable
   * showAll este estado lo que me va a permitir sera primero obtener un nuevo arreglo basado en el arreglo 
   * de notas que ya se tiene y dependiendo del valor que esta variable de showAll tenga vamos a mostrar las notas 
   * si el valor de esta variables es true su estado inicial pues entonces vamos a mostrar en la interfaz
   * todas las notas que inicialmente ya se tenían en el arreglo de notas pero si se cambia el 
   * valor de esta variable a false pues entonces este estado va a aplicar una lógica que va mostrar solo 
   * las notas que tienen una propiedad de important como true*/
  const [showAllNotes, setShowAllNotes] = useState(true);

  useEffect(() => {
    noteService
      .getAllNotes()
      .then((arrayNotes) => {
        setNotes(arrayNotes)
      });
  }, []);

  const addNewNote = (event) => {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .createNote(newNoteObject)
      .then(newArrayNotes => {
        setNotes(newArrayNotes);
        setNewNote("");
      });
  }


  const handleValueInput = (event) => {
    let value = event.target.value;
    setNewNote(value);
  }

  const handleShowAll = () => {
    setShowAllNotes(!showAllNotes);
  }

  const handleImportanceNote = (id) => {
    const note = notes.find(n => n.id === id);

    const changeNote = { ...note, important: !note.important }

    noteService
      .updateNote(id, changeNote)
      .then((arrayNotesUpdate) => {
        setNotes(arrayNotesUpdate)
      })
      .catch(error => {
        setNotes(notes.filter(n => n.id !== id));
        setShowAllNotes(showAllNotes)
      })
  }

  const noteToShow = showAllNotes
    ? notes
    : notes.filter((note) => note.important === true);


  return (
    <>
      <h1>NOTES</h1>
      <div>
        <button onClick={handleShowAll}>
          show {showAllNotes ? "important notes" : "All notes"}
        </button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id} // La KEY va aquí en el componente iterado
            note={note}
            importanceNote={() => handleImportanceNote(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNewNote}>
        <input value={newNote} onChange={handleValueInput}  className='inputNote'/>
        <button type='submit' >Save Note</button>
      </form>
    </>
  )
}

export default App
