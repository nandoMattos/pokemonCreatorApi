import { NextFunction, Request, Response } from "express";
import { PokemonBody } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { pokemonTypeRepository } from "../repositories/pokemonTypeRepository.js";

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

export async function pokemonIdExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const pokemonId = Number(req.params.id);
    const pokemonExists = await pokemonRepository.findPokemonById(pokemonId);
    if (!pokemonExists.rows[0]) {
      res.status(404).send("Pokemon not found");
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function typeIdExistsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const typeId = Number(req.params.typeId);
    const typeExists = await pokemonTypeRepository.findTypeById(typeId);

    if (!typeExists.rows[0]) {
      return res.sendStatus(404);
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
