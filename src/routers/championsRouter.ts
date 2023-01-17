import { Router } from "express";
import { getChampions } from "../controllers/championsController.js";

const router = Router()

router.get("/champions", getChampions)

export default router