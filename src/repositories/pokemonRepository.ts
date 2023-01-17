import { QueryResult } from "pg";
import connection from "../database/db.js";
import { Pokemon } from "../protocols/Pokemon.js";

function insertOne(pokemon: Pokemon) {
  return connection.query(
    `
    INSERT INTO pokemons
    (name, weight)
    VALUES
    ($1, $2)
    RETURNING id;
  `,
    [pokemon.name, pokemon.weight]
  );
}

function findPokemonByName(pokemon: Pokemon): Promise<QueryResult<Pokemon>> {
  return connection.query(
    `
    SELECT * 
    FROM pokemons
    WHERE name = $1;
  `,
    [pokemon.name]
  );
}

export const pokemonRepository = {
  insertOne,
  findPokemonByName,
};
