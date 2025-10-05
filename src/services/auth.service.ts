import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

export const loginUser = async (username: string, password: string) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("INVALID_PASSWORD");
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    return { token, username: user.username };

}

export const registerUser = async (username: string, password: string) => {
    if (await User.findOne({ username })) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    // Hashing the password to save it in the database
    // bcrypt is hashing the password with using salt that it can trace on its own
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and then save it to the database
    const user = await User.create({ username, password: hashedPassword });
    await user.save();
    return user;
};
