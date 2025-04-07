import { Schema, model } from 'mongoose';

const technologySchema = new Schema({
    html5: String,
    css3: String,
    javascript: String,
    tailwind: String,
    react: String,
    next: String,
    node: String,
    express: String,
    mongodb: String,
    mysql: String,
    postgresql: String,
    firebase: String,
    typescript: String,
    python: String,
    django: String,
    flask: String,
    docker: String
});

const projectSchema = new Schema({
    img: {
        type: String,
        required: [true, 'Image is required']
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    LiveLink: {
        type: String,
        required: [true, 'Live link is required']
    },
    technology: [technologySchema]
});

export const ProjectModel = model('Project', projectSchema);
