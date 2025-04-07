import { Request, Response } from 'express';
import { ProjectModel } from './projects.model';
import { Project } from './projects.interface';

// Create a new project
const createProject = async (req: Request, res: Response) => {
    try {
        const projectData: Project = req.body;
        const result = await ProjectModel.create(projectData);
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error
        });
    }
};

// Get all projects
const getAllProjects = async (req: Request, res: Response) => {
    try {
        const result = await ProjectModel.find();
        res.status(200).json({
            success: true,
            message: 'Projects retrieved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve projects',
            error: error
        });
    }
};



export const ProjectController = {
    createProject,
    getAllProjects,
 
};
