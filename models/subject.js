import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
    {
        subjectId: { type: String, required: true },
        subject_name: { type: String, required: true },
        total_books: { type: Number, required: true },
        frequency: { type: Number, required: true },


        books: [
            {

                bookId: { type: String, required: true }
            }
        ]
    }, { timestamps: true }
);

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject