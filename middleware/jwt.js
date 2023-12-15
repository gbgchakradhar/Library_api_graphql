import jwt from "jsonwebtoken"

export const generateToken = (user) => {
    const { _id, role } = user;
    const accessToken = jwt.sign(
        {
            _id,
            role
        },
        process.env.JWT_SEC,
        { expiresIn: '1d' }
    );

    return accessToken;
};
