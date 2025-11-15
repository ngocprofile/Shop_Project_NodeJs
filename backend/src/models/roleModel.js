import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Không trùng tên vai trò
        enum: ["user", "staff", "admin"],
    },
    description: {
        type: String,
        default: "",
    },
    permissions: [
        {
        type: String,
        default: [],
        },
    ],
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
