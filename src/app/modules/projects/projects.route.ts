import { Router } from "express";
import { ProjectController } from "./projects.controller";
import { RequestHandler } from "express";

const router = Router();

router.post('/create-project', ProjectController.createProject as RequestHandler);
router.get('/', ProjectController.getAllProjects as RequestHandler);

export const ProjectRoutes = router;
