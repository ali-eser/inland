import noteService from "../services/noteService";
import express from "express";
import { NotFoundError } from "../../exceptions/NotFoundError";

const noteRouter = express.Router();

noteRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer" });
      return;
    }
    const notes = await noteService.fetchNotesByUser(id);
    res.status(201).json({ notes: notes });
    return;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
});

noteRouter.get("/single/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid note ID. ID must be an integer." });
      return;
    }

    const note = await noteService.fetchSingleNote(id);
    res.status(201).json(note);
    return;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
});

noteRouter.post("/", async (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: "A user ID must be specified" });
      return;
    }
    const userId: number = parseInt(req.body.userId);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer." });
      return;
    }

    if (req.body.title) {
      const { title, content } = req.body;
      const newNote = await noteService.createNote(userId, content, title);
      res.status(201).json(newNote);
      return;
    } else {
      const content: string = req.body.content;
      const newNote = await noteService.createNote(userId, content);
      res.status(201).json(newNote);
      return;
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
});

noteRouter.put("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid note ID. ID must be an integer." });
      return;
    }

    const content: string = req.body.content;
    const updatedNote = await noteService.updateNote(id, content);
    res.status(204).json({ updatedNote });
    return;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({error: error.message});
      return;
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
});

noteRouter.delete("/:id", async (req, res) => {
  try {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid note ID. ID must be an integer." });
      return;
    }

    await noteService.deleteNote(id);
    res.status(204).json({ message: `The note with ID ${id} deleted successfully` });
    return;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(error.statusCode).json({error: error.message});
      return;
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
});

export default noteRouter;
