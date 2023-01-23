import { Router } from "express";
import pokemonsRouter from "./pokemonsRouter.js";
import typesRouter from "./pokemonTypesRouter.js";

const router = Router();

router.use(pokemonsRouter);
router.use(typesRouter);

export default router;
