import Time from "../../models/timeLog.js";
import { authorize } from "../../middleware/authorize.js"


export const timeLogResolvers = {
    Query: {
        timeLogs: async (context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                return await Time.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching time logs');
            }
        },
        timeLog: async (_, { id }, context) => {
            await authorize(context, ['Head admin', 'Branch admin', 'Librarian'])

            try {
                return await Time.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching time log by ID');
            }
        },
    },
    Mutation: {
        logInTime: async (_, { designation, Id, branch, date, in_time }) => {
            try {
                const newLog = new Time({ designation, Id, branch, date, in_time });
                return await newLog.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error logging in time');
            }
        },
        logOutTime: async (_, { Id, date, out_time }) => {
            try {
                const updatedLog = await Time.findOneAndUpdate(
                    { Id, date },
                    { $set: { out_time } },
                    { new: true }
                );
                return updatedLog;
            } catch (error) {
                console.error(error);
                throw new Error('Error logging out time');
            }
        },
    },
};

