import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
    {
        branchId: { type: String, required: true },
        location: { type: String, required: true },
        capacity: { type: Number, required: true },
        book: [
            {
                bookId: { type: String, required: true },
                subjects: [{
                    subject_name: { type: String, required: true }
                },],
            }

        ],
        staff: [
            {
                staffId: { type: String, required: true },
            }
        ],
    }, { timestamps: true }
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch