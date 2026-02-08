import { Request, Response } from 'express';
import { RegisterSchema, LoginSchema } from '@mediconnect/shared-types';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const validatedData = RegisterSchema.parse(req.body);
        const user = await AuthService.registerUser(validatedData);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const validatedData = LoginSchema.parse(req.body);
        const { user, token, refreshToken } = await AuthService.loginUser(validatedData);

        // Set HttpOnly cookie for refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({ user, token });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
};
