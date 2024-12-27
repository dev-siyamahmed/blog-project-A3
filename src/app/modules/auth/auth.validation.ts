import { z } from 'zod';

const loginUserValidationSchema = z.object({
    body: z.object({
        email: z
            .string({ invalid_type_error: 'Email must be a string' })
            .email({ message: 'Invalid email address' }),

        password: z
            .string({ invalid_type_error: 'Password must be a string' })
            .min(6, { message: 'Password must be at least 6 characters long' })
    }),
});


export const AuthValidation = {
    loginUserValidationSchema,

};