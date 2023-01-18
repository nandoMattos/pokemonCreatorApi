import { Pokemon } from "../protocols/Pokemon";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { pokemonTypeRepository } from "../repositories/pokemonTypeRepository.js";

export async function insertPokemonAndTypes(newPokemon: Pokemon) {
  const insertedTypeIds: number[] = await insertNonExistentTypes(
    newPokemon.type
  );
  const insertedPokemonId = await pokemonRepository.insertOne(newPokemon);
  await pokemonRepository.insertPokemon_type(
    insertedPokemonId.rows[0].id,
    insertedTypeIds
  );
}

export async function insertNonExistentTypes(
  types: string[]
): Promise<number[]> {
  let insertedTypesId: number[] = [];
  for (let type of types) {
    const typeExists = await pokemonTypeRepository.findTypeByName(type);
    if (typeExists.rows[0]) {
      insertedTypesId.push(typeExists.rows[0].id);
    } else {
      const insertedId = await pokemonTypeRepository.insertOne(type);
      insertedTypesId.push(insertedId.rows[0].id);
    }
  }
  return insertedTypesId;
}
