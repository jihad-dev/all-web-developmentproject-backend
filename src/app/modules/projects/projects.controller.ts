import { Request, Response } from 'express';
import { ProjectModel } from './projects.model';
import { Project } from './projects.interface';

// Create a new project
const createProject = async (req: Request, res: Response) => {
    try {
        const projectData: Project = req.body;
        
        // Validate required fields
        if (!projectData.img || !projectData.name || !projectData.category || !projectData.LiveLink) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                requiredFields: ['img', 'name', 'category', 'LiveLink']
            });
        }

        // Ensure technology is an array
        if (!Array.isArray(projectData.technology)) {
            projectData.technology = [projectData.technology];
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
