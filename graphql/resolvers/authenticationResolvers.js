import UserSchema from "../../models/user.js"
import { generateToken } from "../../middleware/jwt.js";
import CryptoJS from "crypto-js"

const findUserByEmail = async (email) => {
    try {
        const user = await UserSchema.findOne({ email });
        return user;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Internal server error');
    }
};

export const authorisationResolvers = {
    Mutation: {
        Login: async (_, { email, password }) => {
            try {
                const user = await findUserByEmail(email);

                if (!user) {
                    throw new Error("Wrong email");
                }

                const hashedPassword = CryptoJS.AES.decrypt(
                    user.password,
                    process.env.PASS_SEC
                );

                const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
                const inputPassword = password;

                if (originalPassword !== inputPassword) {
                    throw new Error("Wrong Password");
                }



                if (user && originalPassword === inputPassword) {
                    const token = generateToken(user);

                    const { password, ...others } = user._doc;
                    // console.log(...others);
                    return { token, ...others };
                    // return { token };
                } else {
                    throw new Error('Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                throw new Error('Internal server error');
            }
        },
        Register: async (_, { email, password, name, username, role, branch }) => {
            try {
                if (await findUserByEmail(email)) {
                    // console.log(findUserByEmail(email));
                    throw new Error('Email already in use');
                }

                const newUser = new UserSchema({
                    email,
                    password: CryptoJS.AES.encrypt(
                        password,
                        process.env.PASS_SEC
                    ).toString(),
                    name, username, role, branch
                });
                await newUser.save();
                return "Registration Successful"
            } catch (error) {
                console.log(error);
                throw new Error('Error adding new User');
            }
        }
    }
}
