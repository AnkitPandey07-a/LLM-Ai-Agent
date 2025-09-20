import express from "express"
import { chatController } from "../controllers/chatController.js";

const chatRoute = express.Router();

chatRoute.post('/chat',chatController)



export default chatRoute;