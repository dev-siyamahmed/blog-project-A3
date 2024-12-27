import catchAsync from '../../utils/catchAsync';
import { UseerServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const result = await UseerServices.createUseerIntoDB(req.body);
  return result
});

export const UserControllers = {
  createUser,
};
