import Staff from "../../models/staff.js";

export const staffResolvers = {
    Query: {
        staff: async () => {
            try {
                return await Staff.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching staff');
            }
        },
        getStaff: async (_, { id }) => {
            try {
                return await Staff.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching staff by ID');
            }
        },
    },
    Mutation: {
        addStaff: async (_, { name, age, gender, current_branch, role }) => {
            try {
                const newStaff = new Staff({ name, age, gender, current_branch, role });
                return await newStaff.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new staff');
            }
        },
        updateStaff: async (_, { id, name, age, gender, current_branch, role }) => {
            try {
                const updatedStaff = await Staff.findByIdAndUpdate(
                    id,
                    { $set: { name, age, gender, current_branch, role } },
                    { new: true }
                );
                return updatedStaff;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating staff');
            }
        },
        deleteStaff: async (_, { id }) => {
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


