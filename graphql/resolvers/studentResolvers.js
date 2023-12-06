
import Student from "../../models/student.js";

export const studentResolvers = {
    Query: {
        students: async () => {
            try {
                return await Student.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching students');
            }
        },
        student: async (_, { id }) => {
            try {
                return await Student.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching student by ID');
            }
        },
    },
    Mutation: {
        addStudent: async (_, { studentId, name, age, gender, books_availed }) => {
            try {
                const newStudent = new Student({ studentId, name, age, gender, books_availed });
                return await newStudent.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new student');
            }
        },
        updateStudent: async (_, { id, studentId, name, age, gender, books_availed }) => {
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
        deleteStudent: async (_, { id }) => {
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


