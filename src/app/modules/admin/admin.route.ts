import { Router } from "express";
import { AdminController } from "./admin.controller";
import { RequestHandler } from "express";
import { auth } from "../../middleware/auth";

const router = Router();

router.post('/create-admin',auth('admin') as RequestHandler, AdminController.createAdmin as RequestHandler);
router.post('/login', AdminController.loginAdmin as RequestHandler);

export const AdminRoutes = router; 