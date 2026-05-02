let notes = require("../data/note");

// GET all notes
exports.getNotes = (req, res) => {
  res.json(notes);
};

// CREATE note
exports.createNote = (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: notes.length + 1,
    title,
    content,
  };

  notes.push(newNote);

  res.status(201).json(newNote);
};

// UPDATE note
exports.updateNote = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.title = title;
  note.content = content;

  res.json(note);
};

// DELETE note
exports.deleteNote = (req, res) => {
  const id = parseInt(req.params.id);

  notes = notes.filter((n) => n.id !== id);

  res.json({ message: "Note deleted" });
};
