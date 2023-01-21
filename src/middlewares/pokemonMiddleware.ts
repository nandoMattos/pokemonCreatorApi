import { NextFunction, Request, Response } from "express";
import { PokemonBody } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";

export async function pokemonNameExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newPokemon = req.body as PokemonBody;
    const pokemonExists = await pokemonRepository.findPokemonByName(
      newPokemon.name
    );
    if (pokemonExists.rows[0]) {
      res.status(409).send(`Pokemon "${newPokemon.name}" already exists`);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
