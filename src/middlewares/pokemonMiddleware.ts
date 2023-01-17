import { NextFunction, Request, Response } from "express";
import { Pokemon } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";

export async function pokemonNameExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newPokemon = req.body as Pokemon;
  const pokemonExists = await pokemonRepository.findPokemonByName(newPokemon);
  if (pokemonExists.rows[0]) {
    res.status(409).send(`Pokemon "${newPokemon.name}" already exists`);
    return;
  }

  next();
}
