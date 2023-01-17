import { Router } from "express";
import championsRouter from "../routers/championsRouter.js"

const router = Router();

router.use(championsRouter)

export default router;