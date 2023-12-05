
import Branch from "../../models/branch.js";

export const branchResolvers = {
    Query: {
        branches: async () => {
            try {
                return await Branch.find();
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching branches');
            }
        },
        branch: async (_, { id }) => {
            try {
                return await Branch.findById(id);
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching branch by ID');
            }
        },
    },
    Mutation: {
        addBranch: async (_, { branchId, location, capacity }) => {
            try {
                const newBranch = new Branch({ branchId, location, capacity });
                return await newBranch.save();
            } catch (error) {
                console.error(error);
                throw new Error('Error adding new branch');
            }
        },
        updateBranch: async (_, { id, location, capacity }) => {
            try {
                const updatedBranch = await Branch.findByIdAndUpdate(
                    id,
                    { $set: { location, capacity } },
                    { new: true }
                );
                return updatedBranch;
            } catch (error) {
                console.error(error);
                throw new Error('Error updating branch');
            }
        },
        deleteBranch: async (_, { id }) => {
            try {
                await Branch.findByIdAndDelete(id);
                return "Branch has been deleted.";
            } catch (error) {
                console.error(error);
                throw new Error('Error deleting branch');
            }
        },
    },
};

