import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUseerIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const UseerServices = {
  createUseerIntoDB,
};
