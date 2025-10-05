import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export const registerUser = async (username: string, password: string) => {
    if (await User.findOne({ username })) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    // Hashing the password to save it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and then save it to the database
    const user = await User.create({ username, password: hashedPassword });
    await user.save();
    return user;
};
