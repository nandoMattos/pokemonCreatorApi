import { Request, Response } from "express";
import { Pokemon } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { insertNonExistentTypes } from "../services/pokemonService.js";

export async function postPokemon(req: Request, res: Response) {
  const newPokemon = req.body as Pokemon;
  const insertedIds = await insertNonExistentTypes(newPokemon.type);
  newPokemon.typeId = insertedIds;
  await pokemonRepository.insertOne(newPokemon);

  // const pokemonType = await pokemonRepository.

  return res.sendStatus(201);
}
