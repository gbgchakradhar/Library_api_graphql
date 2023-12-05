import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(

    {
        studentId: { type: String, required: true },
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        books_availed: [
            {
                bookId: { type: String, required: true },
                branchId: { type: String, required: true },
                availed_date: { type: String, required: true },
                return_date: { type: String, required: true },
                availed_time: { type: String, required: true },
                return_time: { type: String, required: true },

            }

        ],
    }, { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);
export default Student