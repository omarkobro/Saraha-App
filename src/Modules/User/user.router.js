import { Router } from "express";

import * as userController from './user.controller.js'
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signInSchema, signUpSchema, updateUserSchema } from "./user.validationSchemas.js";

let router = Router()

router.post("/SignUp",validationMiddleware(signUpSchema), expressAsyncHandler(userController.SignUp))
router.post("/SignIn",validationMiddleware(signInSchema), expressAsyncHandler(userController.signIn))
router.put("/updateUser",validationMiddleware(updateUserSchema), auth(),expressAsyncHandler(userController.updateUser))
router.delete("/deleteUser", auth(),expressAsyncHandler( userController.deleteUser))
router.get("/getUser", expressAsyncHandler(userController.getUser))

export default router