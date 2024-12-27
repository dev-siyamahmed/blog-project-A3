import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';
import httpStatus from 'http-status';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.registerUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User  Registation Is Succesfully',
    data: result,
  });
});

export const AuthController = {
  registerUser,
};
