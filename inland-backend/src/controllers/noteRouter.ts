import noteService from "../services/noteService";
import express, { request } from "express";

const noteRouter = express.Router();

noteRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer" });
    }
    const notes = await noteService.fetchNotesByUser(id);
    res.status(204).json({ notes: notes });
  } catch (error: any) {
    if (error.message.includes("User doesn't exist")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

noteRouter.get("/single/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid note ID. ID must be an integer." });
    }

    const note = await noteService.fetchSingleNote(id);
    res.status(201).json(note);
  } catch (error: any) {
    if (error.message.includes("Note with specified ID")) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

noteRouter.post("/", async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: "A user ID must be specified" });
    }
    const userId: number = parseInt(req.body.userId);

    if (req.body.title) {
      const { title, content } = req.body;
      const newNote = await noteService.createNote(userId, content, title);
      res.status(204).json({ newNote });
    } else {
      const content: string = req.body.content;
      const newNote = await noteService.createNote(userId, content);
      res.status(204).json({ newNote });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

noteRouter.put("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    const content: string = req.body.content;
    const updatedNote = await noteService.updateNote(id, content);
    res.status(204).json({ updatedNote });
  } catch (error: any) {
    if (error.message.includes("specified ID")) {
      res.status(404).json({error: error.message});
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

noteRouter.delete("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    await noteService.deleteNote(id);
    res.status(204).json({ message: `The note with ID ${id} deleted successfully` });
  } catch (error: any) {
    if (error.message.includes("specified ID")) {
      res.status(404).json({error: error.message});
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default noteRouter;
