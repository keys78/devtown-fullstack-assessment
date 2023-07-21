import express from "express";
import * as NotesController from "../controllers/notes";
import { protect } from "../middlewares/authProtect";

const router = express.Router();

router.get("/get-shared-notes", protect, NotesController.getSharedNotesHandler);
router.get("/get-personal-notes", protect, NotesController.getPersonalNotesHandler);
router.get("/get-note/:noteId", protect, NotesController.getSingleNoteHandler);
router.post("/create-note", protect, NotesController.createNoteHandler);
router.patch("/update-note/:noteId", NotesController.updateNoteHandler);
router.delete("/delete-note/:noteId", NotesController.deleteNoteHandler);

export default router;