import User from '../../models/User.model';
import {ResourceNotFound} from '../../responses/errors';

type getUserInput = {
  userId: string;
};

export const getUserById = async (input: getUserInput) => {
  const {userId} = input;
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new ResourceNotFound('Account not found!');
  }
  return existingUser;
};
