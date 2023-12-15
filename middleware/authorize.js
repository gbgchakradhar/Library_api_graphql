export const authorize = async (context, requiredRoles = []) => {
    if (!context.user) {
        throw new Error('Authentication required');
    }

    // Check if the user is "notloggedin" and throw an error
    if (context.user === 'notloggedin') {
        throw new Error('Login first to perform this action');
    }

    // if (userId && context.user.id !== userId) {
    //     throw new Error('You are not allowed to do that!');
    // }
    if (requiredRoles.length > 0 && !requiredRoles.includes(context.user.role)) {
        throw new Error('Insufficient permissions');
    }
};
