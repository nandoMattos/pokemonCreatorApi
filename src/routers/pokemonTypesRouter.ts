import { Router } from "express";
import { getTypes } from "../controllers/pokemonTypesController.js";

const router = Router();

router.get("/types", getTypes);

export default router;
