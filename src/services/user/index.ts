import User from '../../models/User.model';
import {ResourceNotFound} from '../../responses/errors';

type getUserInput = {
  userId: string;
};

class UserService {
  async getUserById(input: getUserInput) {
    const {userId} = input;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new ResourceNotFound('Account not found!');
    }
    return existingUser;
  }
}

export const userService = new UserService();
