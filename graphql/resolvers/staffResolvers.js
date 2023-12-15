import Staff from "../../models/staff.js";
import { authorize } from "../../middleware/authorize.js"

export const staffResolvers = {
    Query: {
        staff: async (context) => {
            await authorize(context, ['Head admin', 'Branch admin'])

            try {
                return await Staff.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching staff');
            }
        },
        getStaff: async (_, { id }, context) => {
            await authorize(context, ['Head admin', 'Branch admin'])

            try {
                return await Staff.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching staff by ID');
            }
        },
    },
    Mutation: {
        addStaff: async (_, { staffId, name, age, gender, current_branch, role }, context) => {
            await authorize(context, ['Head admin', 'Branch admin'])

            try {
                const newStaff = new Staff({ staffId, name, age, gender, current_branch, role });
                return await newStaff.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new staff');
            }
        },
        updateStaff: async (_, { id, staffId, name, age, gender, current_branch, role }, context) => {
            await authorize(context, ['Head admin', 'Branch admin'])

            try {
                const updatedStaff = await Staff.findByIdAndUpdate(
                    id,
                    { $set: { staffId, name, age, gender, current_branch, role } },
                    { new: true }
                );
                return updatedStaff;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating staff');
            }
        },
        deleteStaff: async (_, { id }, context) => {
            await authorize(context, ['Head admin', 'Branch admin'])

            try {
                await Staff.findByIdAndDelete(id);
                return "Staff has been deleted.";
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting staff');
            }
        },
    },
};


