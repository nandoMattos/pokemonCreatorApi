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

function insertPokemon_type(pokemonId: number, typeId: number[]) {
  return connection.query(
    `
    INSERT INTO pokemon_type
    (id_pokemon, id_type)
    VALUES
    ($1, $2) ${typeId[1] && ", ($1, $3)"};
  `,
    [pokemonId, typeId[0], typeId[1]]
  );
}

function findAllPokemonsWithTypes(): Promise<QueryResult<any>> {
  return connection.query(`
    SELECT p.name, p.weight, t1.name as "type1", t2.name as "type2"
    FROM pokemons p
    LEFT JOIN types t1 on p.id_type = t1.id
    LEFT JOIN types t2 ON p.id_type2 = t2.id;
  `);
}
export const pokemonRepository = {
  insertOne,
  findPokemonByName,
  insertPokemon_type,
  findAllPokemonsWithTypes,
};
