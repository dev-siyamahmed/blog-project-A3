import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';

// create user service
const registerUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const AuthService = {
  registerUserIntoDB,
};
