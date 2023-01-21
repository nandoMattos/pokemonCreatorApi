import { Request, Response } from "express";
import { PokemonBody } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { insertPokemonAndTypes } from "../services/pokemonService.js";

export async function postPokemon(req: Request, res: Response) {
  const newPokemon = req.body as PokemonBody;
  insertPokemonAndTypes(newPokemon);

  return res.sendStatus(201);
}

export async function getPokemonsAndTypes(req: Request, res: Response) {
  try {
    const allPokemons = await pokemonRepository.findAllPokemonsWithTypes();

    res.send(allPokemons.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
