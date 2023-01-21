import { QueryResult } from "pg";
import connection from "../database/db.js";
import { PokemonBody, PokemonEntity } from "../protocols/Pokemon.js";
import { PokemonType } from "../protocols/PokemonType.js";

function insertOne(pokemon: PokemonBody) {
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

function findPokemonByName(
  pokemonName: string
): Promise<QueryResult<PokemonEntity>> {
  return connection.query(
    `
    SELECT p.id, p.name, p.weight,
    json_agg(
      t.name
    ) as type
    FROM pokemons p
    LEFT JOIN pokemon_type pt ON p.id = pt.id_pokemon
    LEFT JOIN types t ON t.id = pt.id_type
    WHERE p.name = $1
    GROUP BY p.id;
  `,
    [pokemonName]
  );
}

function insertPokemon_type(pokemonId: number, pokemonTypes: PokemonType[]) {
  let pokemonAndTypeId: number[] = [pokemonId, pokemonTypes[0].id];
  pokemonTypes[1] && pokemonAndTypeId.push(pokemonTypes[1].id);
  return connection.query(
    `
    INSERT INTO pokemon_type
    (id_pokemon, id_type)
    VALUES
    ($1, $2) ${pokemonTypes[1] === undefined ? "" : ", ($1, $3)"};
  `,
    pokemonAndTypeId
  );
}

function findAllPokemonsWithTypes(): Promise<QueryResult<PokemonBody>> {
  return connection.query(`
    SELECT p.id, p.name, p.weight,
    json_agg(
      t.name
    ) as type
    FROM pokemons p
    LEFT JOIN pokemon_type pt ON p.id = pt.id_pokemon
    LEFT JOIN types t ON t.id = pt.id_type
    GROUP BY p.id;
  `);
}
export const pokemonRepository = {
  insertOne,
  findPokemonByName,
  insertPokemon_type,
  findAllPokemonsWithTypes,
};
