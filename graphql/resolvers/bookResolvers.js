import Book from "../../models/book.js";
import { authorize } from "../../middleware/authorize.js"
export const bookResolvers = {
    Query: {
        books: async () => {
            try {
                return await Book.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching books');
            }
        },
        book: async (_, { id }) => {
            try {
                return await Book.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching book by ID');
            }
        },
    },
    Mutation: {
        addBook: async (_, { bookId, name, total_copies, available_copies, subject }, context) => {
            // console.log(context);
            try {
                await authorize(context, ['Head admin', 'Branch admin'])
                const newBook = new Book({ bookId, name, total_copies, available_copies, subject });
                const savedBook = await newBook.save();
                return savedBook
            } catch (error) {
                console.error(error.message);
                throw new Error('Error adding new book');
            }
        },
        updateBook: async (_, { id, bookId, name, total_copies, available_copies, subject }, context) => {
            try {
                await authorize(context, ['Head admin', 'Branch admin'])

                const updatedBook = await Book.findByIdAndUpdate(
                    id,
                    { $set: { bookId, name, total_copies, available_copies, subject } },
                    { new: true }
                );
                return updatedBook;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating book');
            }
        },
        deleteBook: async (_, { id }, context) => {
            try {
                await authorize(context, ['Head admin', 'Branch admin'])

                await Book.findByIdAndDelete(id);
                return "Book has been deleted.";
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting book');
            }
        },
    },
};


