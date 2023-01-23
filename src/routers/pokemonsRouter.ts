import { Router } from "express";
import {
  deletePokemon,
  getPokemonsAndTypes,
  postPokemon,
  putPokemon,
} from "../controllers/pokemonsController.js";
import {
  pokemonIdExistsMiddleware,
  pokemonNameExistsMiddleware,
} from "../middlewares/pokemonMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { pokemonSchema, pokemonSchemaNoType } from "../models/pokemonSchema.js";

const router = Router();

router.post(
  "/pokemons",
  validateSchemaMiddleware(pokemonSchema),
  pokemonNameExistsMiddleware,
  postPokemon
);

router.get("/pokemons", getPokemonsAndTypes);

router.put(
  "/pokemons/:id",
  validateSchemaMiddleware(pokemonSchemaNoType),
  pokemonNameExistsMiddleware,
  pokemonIdExistsMiddleware,
  putPokemon
);

router.delete("/pokemons/:id", pokemonIdExistsMiddleware, deletePokemon);

export default router;
