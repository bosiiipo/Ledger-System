import jwt from 'jsonwebtoken';
import {config} from '../../config';

type JwtData = {
  userId: string;
}

class JwtController {
  async sign(data: JwtData) {
    return await jwt.sign(
        data,
        config.secret as string,
        { expiresIn: 3600 }
    );
  }

  async verify(jwtToken: string) {
    return jwt.verify(jwtToken, config.secret as string);
  }
}

export const jwtController = new JwtController();
