import { pokemonRepository } from "../repositories/pokemonRepository";
import { pokemonTypeRepository } from "../repositories/pokemonTypeRepository.js";

export async function insertNonExistentTypes(
  types: string[]
): Promise<number[]> {
  let insertedTypesId: number[] = [];
  for (let type of types) {
    const typeExists = await pokemonTypeRepository.findTypeByName(type);
    if (!typeExists.rows[0]) {
      const insertedId = await pokemonTypeRepository.insertOne(type);
      insertedTypesId.push(insertedId.rows[0].id);
    } else {
      const existentTypeId = await pokemonTypeRepository.findTypeByName(type);
      insertedTypesId.push(existentTypeId.rows[0].id);
    }
  }
  return insertedTypesId;
}
