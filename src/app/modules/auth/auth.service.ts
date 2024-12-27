import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

// create user service
const registerUserIntoDB = async (payload: TUser) => {

    const isExitsUser = await UserModel.findOne({ email: payload.email })
    if (isExitsUser) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exists")
    }
    const result = await UserModel.create(payload);
    return result;
};


const loginUserFromDB = async (payload: TLoginUser) => {

    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(payload.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already Blocked

    const isBlocked = user?.isBlocked;

    if (isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
    }

    // //checking if the password is correct

    const isValidPassword = await UserModel.isPasswordValidation(payload?.password, user?.password)
    if (!isValidPassword) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password is Invalid');
    }

    //create token and sent to the  client
    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const Token = createToken(
        jwtPayload,
        config.jwt_access_secret_key as string,
        config.jwt_access_expires_in as string,
    );

    return {
        Token,
    };
};

export const AuthService = {
    registerUserIntoDB,
    loginUserFromDB
};
