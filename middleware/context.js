import { authenticate } from "./authenticate.js";
export const context = async ({ req }) => {

    let contextObject = {};
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            const user = await authenticate(authHeader);
            // contextObject.user = user;
            contextObject = user;
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    }
    else {
        // contextObject.user = "notloggedin";
        contextObject = "notloggedin";

        console.error("Not Loggedin")
    }
    return contextObject;
}




