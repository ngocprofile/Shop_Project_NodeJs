import express from "express";
import {
    createBrand,
    deleteBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
} from "../controllers/brandController.js";
import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

// 📜 Public routes
router.get("/", getAllBrands);
router.get("/:id", getBrandById);

// 🔐 Admin routes
router.post("/", protect, authorizeRoles("admin"), validate(schemas.createBrand), activityLogMiddleware(['post brand', 'create brand']), createBrand);
router.put("/:id", protect, authorizeRoles("admin"), validate(schemas.updateBrand), activityLogMiddleware(['put brand', 'update brand']), postActivityLog, updateBrand);
router.delete("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['delete brand']), postActivityLog, deleteBrand);

export default router;