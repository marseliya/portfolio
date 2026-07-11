// be/routes/ContactRoutes.js
import express from "express";
import {
    getAllMessages,
    getMessageById,
    getUnreadMessages,
    createMessage,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteMessage
} from "../controllers/ContactCtrl.js";

const router = express.Router();

// ✅ ROUTE SPESIFIK DIATAS ROUTE DINAMIS
router.get("/", getAllMessages);
router.get("/unread", getUnreadMessages);
router.patch("/read-all", markAllAsRead);
router.patch("/read/:id", markAsRead);
router.patch("/unread/:id", markAsUnread);
router.get("/:id", getMessageById);
router.post("/", createMessage);  // ← HAPUS /create
router.delete("/:id", deleteMessage);  

export default router;