import { Request, Response } from "express";
import { Pokemon } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { insertPokemonAndTypes } from "../services/pokemonService.js";

export async function postPokemon(req: Request, res: Response) {
  const newPokemon = req.body as Pokemon;
  insertPokemonAndTypes(newPokemon);

  return res.sendStatus(201);
}

export async function getPokemonsAndTypes(req: Request, res: Response) {
  const result = await pokemonRepository.findAllPokemonsWithTypes();
  const allPokemons: Pokemon[] = result.rows;
  res.send(
    allPokemons.map((p) => {
      return { name: p.name, weight: p.weight };
    })
  );
}
