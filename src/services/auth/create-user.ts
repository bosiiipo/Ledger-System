import User from '../../models/User.model';
import bcrypt from "bcryptjs";
import { jwtController } from '../jwt';

type createUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

export const createUser = async (input: createUserInput) => {
    const { firstName, lastName, email, password } = input;
    const existingUser = await User.findOne({ email });
    if (existingUser){
        throw new Error("Email already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    
    await newUser.save();

    const userWithoutPassword = await User.findById(newUser._id).lean().select("-password");

    let jwtToken = await jwtController.sign({
        userId: newUser._id as string
    });

    return {user: userWithoutPassword, jwtToken};
};


