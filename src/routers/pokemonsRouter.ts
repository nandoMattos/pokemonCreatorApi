import { Router } from "express";
import { postPokemon } from "../controllers/pokemonsController.js";
import { pokemonNameExistsMiddleware } from "../middlewares/pokemonMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { pokemonSchema } from "../models/pokemonSchema.js";

const router = Router();

router.post(
  "/pokemons",
  validateSchemaMiddleware(pokemonSchema),
  pokemonNameExistsMiddleware,
  postPokemon
);

export default router;
