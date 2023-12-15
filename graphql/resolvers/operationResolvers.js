import Time from "../../models/timeLog.js";
import Book from "../../models/book.js";
import Subject from "../../models/subject.js";
import { authorize } from "../../middleware/authorize.js"

export const peopleCountResolver = {
    Query: {
        peopleCountInLibrary: async (_, { from_time, to_time, branch, date }, context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            const fromTime = new Date(`${date}T${from_time}Z`);
            const toTime = new Date(`${date}T${to_time}Z`);

            try {
                const data = await Time.find({
                    branch: branch,
                    date: date,
                });

                const filteredData = data.filter((entry) => {
                    const entryInTime = new Date(`${date}T${entry.in_time}Z`);
                    return entryInTime >= fromTime && entryInTime <= toTime;
                });

                const studentCount = filteredData.filter(
                    (entry) => entry.designation === "Student"
                ).length;
                const staffCount = filteredData.filter(
                    (entry) => entry.designation === "Staff"
                ).length;

                return {
                    studentCount: studentCount,
                    staffCount: staffCount,
                };
            } catch (err) {
                console.log(err);
                throw new Error("Internal Server Error");
            }
        },
    },
};




export const availBookResolver = {
    Mutation: {
        borrowBook: async (_, { bookId }, context) => {
            try {
                await authorize(context, ['Head admin', 'Branch admin', 'Librarian', 'Student'])

                const result = await Book.findOne({ "bookId": bookId });

                if (!result) {
                    return { message: "Book not found" };
                }

                const availableCopies = result.available_copies;

                if (availableCopies >= 1) {


                    const updatedResult = await Book.findOneAndUpdate(
                        { "bookId": bookId },
                        { $inc: { "available_copies": -1 } },
                        { new: true }
                    );

                    const response = {
                        id: updatedResult._id,
                        bookId: updatedResult.bookId,
                        name: updatedResult.name,
                        available_copies: updatedResult.available_copies,
                    };

                    const subjectList = result.subject;
                    for (let index = 0; index < subjectList.length; index++) {
                        const subjectName = subjectList[index].subject_name;
                        await Subject.findOneAndUpdate(
                            { "subject_name": subjectName },
                            { $inc: { "frequency": 1 } }
                        );
                    }
                    return response;
                }
                else {
                    return { message: "Book Requested is currently unavailable!" };
                }

            } catch (error) {
                console.error(error);
                throw new Error("Internal Server Error");
            }
        },
    },
};
