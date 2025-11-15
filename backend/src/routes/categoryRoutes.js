import express from "express";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../controllers/categoryController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// Admin routes
router.post("/", protect, authorizeRoles("admin"), validate(schemas.createCategory), activityLogMiddleware(['post category', 'create category']), createCategory);
router.put("/:id", protect, authorizeRoles("admin"), validate(schemas.updateCategory), activityLogMiddleware(['put category', 'update category']), postActivityLog, updateCategory);
router.delete("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['delete category']), postActivityLog, deleteCategory);

export default router;