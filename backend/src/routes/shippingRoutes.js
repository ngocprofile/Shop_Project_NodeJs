import express from "express";
import {
    createShippingMethod,
    deleteShippingMethod,
    getAllShippingMethods,
    getShippingById,
    updateShippingMethod,
} from "../controllers/shippingController.js";

import { activityLogMiddleware, postActivityLog } from "../middleware/activityLogMiddleware.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import validate, { schemas } from "../middleware/validateMiddleware.js"; // Import validate và schemas

const router = express.Router();

// 📦 Người dùng xem tất cả phương thức vận chuyển
router.get("/", getAllShippingMethods);

// 🔍 Lấy chi tiết 1 phương thức
router.get("/:id", getShippingById);

// 🧑‍💼 Admin quản lý phương thức vận chuyển
router.post("/", protect, authorizeRoles("admin"), validate(schemas.createShippingMethod), activityLogMiddleware(['post shipping', 'create shipping']), createShippingMethod);
router.put("/:id", protect, authorizeRoles("admin"), validate(schemas.updateShippingMethod), activityLogMiddleware(['put shipping', 'update shipping']), postActivityLog, updateShippingMethod);
router.delete("/:id", protect, authorizeRoles("admin"), activityLogMiddleware(['delete shipping']), postActivityLog, deleteShippingMethod);

export default router;