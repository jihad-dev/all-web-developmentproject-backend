import { Request, Response } from 'express';
import { AdminModel } from './admin.model';
import { IAdmin } from './admin.interface';
import { createToken } from '../../helpers/jwtHelper';
import config from '../../config';


const createAdmin = async (req: Request, res: Response) => {
    try {
        const adminData: IAdmin = req.body;
        const result = await AdminModel.create(adminData);
        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create admin',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        const token = createToken(
            { email: admin.email, role: admin.role },
            config.jwt.secret as string,
            config.jwt.expires_in as string
        );

        res.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
            data: {
                accessToken: token
            }
        });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to login admin',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const AdminController = {
    createAdmin,
    loginAdmin
}; 