import authController from "../controllers/auth.controller.js";

import { Router } from "express";

const authRouter = Router();

authRouter.post("/login", authController.loginController);
authRouter.post("/cadastro", authController.CadastroController);

export default authRouter;