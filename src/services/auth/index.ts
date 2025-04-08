import { jwtController } from '../../controllers/jwt.controller';
import User from '../../models/User.model';
import { AuthenticationError, ResourceNotFound } from '../../responses/errors';
import bcrypt from "bcryptjs";

type signInInput = {
    email: string;
    password: string;
};

type createUserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
  
class AuthService {
    async signInUser(input: signInInput) {
      const {email, password} = input;
      const existingUser = await User.findOne({email});
      if (!existingUser) {
        throw new ResourceNotFound('Account not found!');
      }
    
      const passwordValidated = await existingUser.comparePassword(password);
    
      if (!passwordValidated) throw new AuthenticationError('Invalid Password');
    
      const token = jwtController.sign({userId: existingUser.id});
    
      return token;
    };
    
    async createUser (input: createUserInput) {
      const {firstName, lastName, email, password} = input;
      const existingUser = await User.findOne({email});
      if (existingUser) {
        throw new Error('Email already in use');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
    
      await newUser.save();
    
      const userWithoutPassword = await User.findById(newUser._id)
        .lean()
        .select('-password');
    
      const jwtToken = await jwtController.sign({
        userId: newUser._id as string,
      });
    
      return {user: userWithoutPassword, jwtToken};
    };
}

export const authService = new AuthService();
