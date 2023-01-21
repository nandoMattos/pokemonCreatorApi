import { PokemonBody } from "../protocols/Pokemon";
import { PokemonType } from "../protocols/PokemonType";
import { pokemonRepository } from "../repositories/pokemonRepository.js";
import { pokemonTypeRepository } from "../repositories/pokemonTypeRepository.js";

export async function insertPokemonAndTypes(newPokemon: PokemonBody) {
  try {
    const types: PokemonType[] = newPokemon.type.map((t) => {
      return { name: t };
    });
    const insertedTypes: PokemonType[] = await insertNonExistentTypes(types);
    const insertedPokemonId = await pokemonRepository.insertOne(newPokemon);
    await pokemonRepository.insertPokemon_type(
      insertedPokemonId.rows[0].id,
      insertedTypes
    );
  } catch (err) {
    console.log(err);
  }
}

export async function insertNonExistentTypes(
  types: PokemonType[]
): Promise<PokemonType[]> {
  let insertedTypes: PokemonType[] = [];
  try {
    for (let type of types) {
      const typeExists = await pokemonTypeRepository.findTypeByName(type.name);
      if (typeExists.rows[0]) {
        insertedTypes.push(typeExists.rows[0]);
      } else {
        const insertedId = await pokemonTypeRepository.insertOne(type.name);
        insertedTypes.push(insertedId.rows[0]);
      }
    }
    return insertedTypes;
  } catch (err) {
    console.log(err);
  }
}
