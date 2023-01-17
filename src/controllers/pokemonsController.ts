import { Request, Response } from "express";
import { Pokemon } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";

export async function postPokemon(req: Request, res: Response) {
  const newPokemon = req.body as Pokemon;
  await pokemonRepository.insertOne(newPokemon);
  return res.sendStatus(201);
}
