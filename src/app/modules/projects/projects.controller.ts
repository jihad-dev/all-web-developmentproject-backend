import { Request, Response } from 'express';
import { ProjectModel } from './projects.model';
import { IProject } from './projects.interface';

const createProject = async (req: Request, res: Response) => {
    try {
        const projectData: IProject = req.body;
        
        // Validate required fields
        if (!projectData.image || !projectData.name || !projectData.category || !projectData.liveLink) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                requiredFields: ['image', 'name', 'category', 'liveLink']
            });
        }

        const result = await ProjectModel.create(projectData);
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: result
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create project',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

const getAllProjects = async (req: Request, res: Response) => {
    try {
        const result = await ProjectModel.find();
        res.status(200).json({
            success: true,
            message: 'Projects retrieved successfully',
            data: result
        });
    } catch (error) {
        console.error('Error retrieving projects:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve projects',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
};

export const ProjectController = {
    createProject,
    getAllProjects
};
