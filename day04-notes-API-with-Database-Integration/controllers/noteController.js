const Note = require("../models/Note");

// GET all notes
exports.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// CREATE note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  const note = new Note({ title, content });
  await note.save();

  res.status(201).json(note);
};

// UPDATE note
exports.updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(note);
};

// DELETE note
exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};
