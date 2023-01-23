import e, { Request, Response } from "express";
import { PokemonBody } from "../protocols/Pokemon.js";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { insertPokemonAndTypes } from "../services/pokemonService.js";

export async function postPokemon(req: Request, res: Response) {
  try {
    const newPokemon = req.body as PokemonBody;
    insertPokemonAndTypes(newPokemon);

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getPokemonsAndTypes(req: Request, res: Response) {
  try {
    let pokemonName: string;
    if (req.query && req.query.name) {
      pokemonName = (req.query as any).name;
    }
    const allPokemons = await pokemonRepository.findPokemonsWithTypes(
      pokemonName
    );

    res.send(allPokemons.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export type PokemonBodyNoTypes = Omit<PokemonBody, "type">;

export async function putPokemon(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const modifiedPokemon = { ...req.body, id } as PokemonBodyNoTypes;
    pokemonRepository.updatePokemon(modifiedPokemon);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
}

export async function deletePokemon(req: Request, res: Response) {
  try {
    const id: number = Number(req.params.id);

    await pokemonRepository.deletePokemon_type(id);
    await pokemonRepository.deletePokemonById(id);
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
