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
import validate, { schemas } from "../middleware/validateMiddleware.js";

const router = express.Router();

// 📦 PUBLIC: Lấy danh sách (Có thể truyền ?provinceCode=79 để lọc)
router.get("/", getAllShippingMethods);

// 🔍 ADMIN: Lấy chi tiết
router.get("/:id", protect, authorizeRoles("admin"), getShippingById);

// 🛠️ ADMIN: Tạo mới
router.post("/", 
    protect, 
    authorizeRoles("admin"), 
    validate(schemas.createShippingMethod), // ⚠️ Cần cập nhật Schema Joi
    activityLogMiddleware(['post shipping', 'create shipping']), 
    createShippingMethod
);

// 🛠️ ADMIN: Cập nhật
router.put("/:id", 
    protect, 
    authorizeRoles("admin"), 
    validate(schemas.updateShippingMethod), // ⚠️ Cần cập nhật Schema Joi
    activityLogMiddleware(['put shipping', 'update shipping']), 
    postActivityLog, 
    updateShippingMethod
);

// 🛠️ ADMIN: Xóa
router.delete("/:id", 
    protect, 
    authorizeRoles("admin"), 
    activityLogMiddleware(['delete shipping']), 
    postActivityLog, 
    deleteShippingMethod
);

export default router;