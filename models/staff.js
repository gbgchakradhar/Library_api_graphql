import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
    {
        staffId: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        current_branch: { type: String, required: true },
        role: { type: String, required: true },

    }, { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff