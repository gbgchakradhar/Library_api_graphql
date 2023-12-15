import Student from "../../models/student.js";
import { authorize } from "../../middleware/authorize.js"

export const studentResolvers = {
    Query: {
        students: async (context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                return await Student.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching students');
            }
        },
        student: async (_, { id }, context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                return await Student.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching student by ID');
            }
        },
    },
    Mutation: {
        addStudent: async (_, { studentId, name, age, gender, books_availed }, context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                const newStudent = new Student({ studentId, name, age, gender, books_availed });
                return await newStudent.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new student');
            }
        },
        updateStudent: async (_, { id, studentId, name, age, gender, books_availed }, context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                const updatedStudent = await Student.findByIdAndUpdate(
                    id,
                    { $set: { studentId, name, age, gender, books_availed } },
                    { new: true }
                );
                return updatedStudent;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating student');
            }
        },
        deleteStudent: async (_, { id }, context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                await Student.findByIdAndDelete(id);
                return "Student has been deleted.";
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting student');
            }
        },
    },
};


