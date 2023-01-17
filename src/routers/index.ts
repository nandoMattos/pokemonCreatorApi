import { Router } from "express";
import pokemonsRouter from "./pokemonsRouter.js"

const router = Router();

router.use(pokemonsRouter)

export default router;