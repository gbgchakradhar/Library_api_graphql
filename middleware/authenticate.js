import jwt from "jsonwebtoken"

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                reject('Token is not valid!');
            } else {
                resolve(user);//check
            }
        });
    });
};

export const authenticate = async (authHeader) => {


    const token = authHeader.split(' ')[1];
    try {
        const user = await verifyToken(token);
        return user;
    } catch (error) {
        throw new Error('Authentication failed: ' + error);
    }

};

