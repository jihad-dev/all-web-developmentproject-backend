import { Schema, model, Document, Model } from 'mongoose';
import { IAdmin } from './admin.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

interface IAdminMethods {
    comparePassword(candidatePassword: string): Promise<boolean>;
}

type AdminModel = Model<IAdmin, {}, IAdminMethods>;

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin'
    }
}, {
    timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds as string)
    );
    next();
});

// Add comparePassword method
adminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const AdminModel = model<IAdmin, AdminModel>('Admin', adminSchema); 