import { Router } from "express";

import * as messageRouter from './message.controller.js'
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { deleteMessage, getUserMessagesSchema, markIsViewedSchema, sendMessageSchema } from "./messges.validationSchemas.js";

let router = Router()


router.post("/sendMessage",validationMiddleware(sendMessageSchema),auth(), expressAsyncHandler(messageRouter.sendMessage))
router.delete("/deleteMessage",validationMiddleware(deleteMessage),auth(), expressAsyncHandler(messageRouter.deleteMessage))
router.put("/markMessageAsRead",validationMiddleware(markIsViewedSchema),auth(),expressAsyncHandler( messageRouter.markMessageAsRead))
router.get("/getMessgaes",auth(),validationMiddleware(getUserMessagesSchema), expressAsyncHandler(messageRouter.getUserMessages))

export default router 