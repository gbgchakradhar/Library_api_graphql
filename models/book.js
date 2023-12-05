import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        bookId: { type: String, required: true },
        name: { type: String, required: true },
        total_copies: { type: Number, required: true },
        available_copies: { type: Number, required: true },

        subject: [
            {
                subject_name: { type: String, required: true }
            }
        ]
    }, { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book

// const mongoose = require("mongoose");

// const bookSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     publicationYear: { type: Number },
// });

// module.exports = mongoose.model("Book", bookSchema);
