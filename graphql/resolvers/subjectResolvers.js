import Subject from "../../models/subject.js";


export const subjectResolvers = {
    Query: {
        subjects: async () => {
            try {
                return await Subject.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching subjects');
            }
        },
        subject: async ({ id }) => {
            try {
                return await Subject.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching subject by ID');
            }
        },

        availableBooksBySubject: async ({ subjectId }) => {
            try {
                const subjectDetails = await Subject.findById(subjectId);
                const booksList = subjectDetails.books;

                const availableBooks = [];

                for (const bookItem of booksList) {
                    const bookDetails = await Book.findOne({ "bookId": bookItem.bookId });
                    if (bookDetails.available_copies >= 1) {
                        availableBooks.push(bookDetails);
                    }
                }

                return availableBooks;
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching available books by subject');
            }
        },
        mostReadSubjects: async () => {
            try {
                return await Subject.find().sort({ "frequency": -1 }).limit(3);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching most read subjects');
            }
        },
    },

    Mutation: {
        addSubject: async ({ subject_name, total_books, frequency }) => {
            try {
                const newSubject = new Subject({ subject_name, total_books, frequency });
                return await newSubject.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new subject');
            }
        },
        updateSubject: async ({ id, subject_name, total_books, frequency }) => {
            try {
                const updatedSubject = await Subject.findByIdAndUpdate(
                    id,
                    { $set: { subject_name, total_books, frequency } },
                    { new: true }
                );
                return updatedSubject;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating subject');
            }
        },
        deleteSubject: async ({ id }) => {
            try {
                await Subject.findByIdAndDelete(id);
                return "Subject has been deleted.";
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting subject');
            }
        },
    },
};


