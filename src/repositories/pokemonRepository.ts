import { QueryResult } from "pg";
import connection from "../database/db.js";
import { Pokemon } from "../protocols/Pokemon.js";

function insertOne(pokemon: Pokemon) {
  return connection.query(
    `
    INSERT INTO pokemons
    (name, weight, id_type, id_type2)
    VALUES
    ($1, $2, $3, $4)
    RETURNING id;
  `,
    [pokemon.name, pokemon.weight, pokemon.typeId[0], pokemon.typeId[1]]
  );
}

function findPokemonByName(pokemonName: string): Promise<QueryResult<Pokemon>> {
  return connection.query(
    `
    SELECT *
    FROM pokemons
    WHERE name = $1;
  `,
    [pokemonName]
  );
}

export const pokemonRepository = {
  insertOne,
  findPokemonByName,
};
