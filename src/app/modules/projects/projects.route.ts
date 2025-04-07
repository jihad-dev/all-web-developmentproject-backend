import { Router } from "express";
import { ProjectController } from "./projects.controller";

const router = Router();

router.post('/create-project', ProjectController.createProject);
router.get('/', ProjectController.getAllProjects);

export const ProjectRoutes = router;