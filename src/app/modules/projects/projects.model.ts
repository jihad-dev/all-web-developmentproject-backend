import { Schema, model } from 'mongoose';
import { IProject } from './projects.interface';

const projectSchema = new Schema<IProject>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    liveLink: {
        type: String,
        required: [true, 'Live link is required']
    },
    technology: [{
        type: String
    }]
});

export const ProjectModel = model<IProject>('Project', projectSchema);
