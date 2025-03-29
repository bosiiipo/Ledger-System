import User from '../../models/User.model';
import { jwtController } from '../jwt';
import { AuthenticationError, ResourceNotFound } from '../../responses/errors';

type signInInput = {
    email: string;
    password: string;
};

export const signInUser = async (input: signInInput) => {
    const { email, password } = input;
    const existingUser = await User.findOne({ email });
    if (!existingUser){
        throw new ResourceNotFound("Account not found!");
    }

    const passwordValidated = await existingUser.comparePassword(password);

    if (!passwordValidated) throw new AuthenticationError("Invalid Password");

    const token = jwtController.sign({ userId: existingUser.id });

    return token;
};
    
    
    