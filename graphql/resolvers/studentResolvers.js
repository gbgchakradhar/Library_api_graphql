
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
        student: async ({ id }) => {
            try {
                return await Student.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching student by ID');
            }
        },
    },
    Mutation: {
        addStudent: async ({ name, age, gender }) => {
            try {
                const newStudent = new Student({ name, age, gender });
                return await newStudent.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new student');
            }
        },
        updateStudent: async ({ id, name, age, gender }) => {
            try {
                const updatedStudent = await Student.findByIdAndUpdate(
                    id,
                    { $set: { name, age, gender } },
                    { new: true }
                );
                return updatedStudent;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating student');
            }
        },
        deleteStudent: async ({ id }) => {
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


