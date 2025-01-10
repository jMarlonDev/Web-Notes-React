
const Note = ({ note , importanceNote}) => {
  const text = note. important
  ? "Important": "Not important"
  return (
    <li className="note">
      {note.content}
      <button onClick={importanceNote}>{text}</button>
    </li>
  );
}

export default Note;
