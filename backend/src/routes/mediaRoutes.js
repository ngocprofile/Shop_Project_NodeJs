import express from "express";
import {
    createMedia,
    deleteMedia,
    getMediaById,
    getMediaByRelated,
    updateMedia
} from "../controllers/mediaController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js"; // Import protect và authorizeRoles
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

// POST /api/media - Tạo media mới (chỉ admin)
router.post("/", protect, authorizeRoles('admin'), validate(schemas.createMedia), activityLogMiddleware(['post media', 'create media']), createMedia);

// GET /api/media/:id - Lấy media theo ID (chỉ admin)
router.get("/:id", protect, authorizeRoles('admin'), activityLogMiddleware(['get media by id']), getMediaById);

// GET /api/media/related/:relatedModel/:relatedId - Lấy media theo related (chỉ admin, có thể query ?type=image)
router.get("/related/:relatedModel/:relatedId", protect, authorizeRoles('admin'), validate(schemas.getMediaByRelated), activityLogMiddleware(['get media related']), getMediaByRelated);

// PUT /api/media/:id - Cập nhật media (chỉ admin)
router.put("/:id", protect, authorizeRoles('admin'), validate(schemas.updateMedia), activityLogMiddleware(['put media', 'update media']), postActivityLog, updateMedia);

// DELETE /api/media/:id - Xóa media (chỉ admin)
router.delete("/:id", protect, authorizeRoles('admin'), activityLogMiddleware(['delete media']), postActivityLog, deleteMedia);

export default router;