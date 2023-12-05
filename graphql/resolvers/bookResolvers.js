import Book from "../../models/book.js";

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
        addBook: async (_, { bookId, name, total_copies, available_copies, subject }) => {
            try {
                const newBook = new Book({ bookId, name, total_copies, available_copies, subject });
                return await newBook.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new book');
            }
        },
        updateBook: async (_, { id, bookId, name, total_copies, available_copies, subject }) => {
            try {
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
        deleteBook: async (_, { id }) => {
            try {
                await Book.findByIdAndDelete(id);
                return "Book has been deleted.";
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting book');
            }
        },
    },
};


