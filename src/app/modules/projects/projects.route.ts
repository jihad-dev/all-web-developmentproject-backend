import { Router } from "express";
import { ProjectController } from "./projects.controller";
import { RequestHandler } from "express";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/create-project', auth('admin') as RequestHandler, ProjectController.createProject as RequestHandler);
router.get('/', ProjectController.getAllProjects as RequestHandler);

export const ProjectRoutes = router;
