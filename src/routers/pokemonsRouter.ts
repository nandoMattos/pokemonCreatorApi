import { Router } from "express";
import {
  deletePokemon,
  getPokemonsAndTypes,
  getPokemonsWithType,
  postPokemon,
  putPokemon,
} from "../controllers/pokemonsController.js";
import {
  pokemonIdExistsMiddleware,
  pokemonNameExistsMiddleware,
  typeIdExistsMiddleware,
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
router.get(
  "/pokemons/types/:typeId",
  typeIdExistsMiddleware,
  getPokemonsWithType
);

router.put(
  "/pokemons/:id",
  validateSchemaMiddleware(pokemonSchemaNoType),
  pokemonNameExistsMiddleware,
  pokemonIdExistsMiddleware,
  putPokemon
);

router.delete("/pokemons/:id", pokemonIdExistsMiddleware, deletePokemon);

export default router;
