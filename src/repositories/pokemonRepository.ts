import { Query, QueryResult } from "pg";
import { PokemonBodyNoTypes } from "../controllers/pokemonsController.js";
import connection from "../database/db.js";
import { PokemonBody, PokemonWithType } from "../protocols/Pokemon.js";
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

function updatePokemon(newPokemon: PokemonBodyNoTypes) {
  return connection.query(
    `
    UPDATE pokemons
    SET name = $1, weight = $2
    WHERE id = $3;
  `,
    [newPokemon.name, newPokemon.weight, newPokemon.id]
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

function deletePokemon_type(pokemonId: number) {
  return connection.query(
    `
    DELETE FROM pokemon_type
    WHERE id_pokemon = $1;
  `,
    [pokemonId]
  );
}

function findPokemonsWithTypes(
  query?: string
): Promise<QueryResult<PokemonBody>> {
  let arr: string[] = [];
  query && arr.push(query + "%");
  return connection.query(
    `
    SELECT p.id, p.name, p.weight,
    json_agg(
      t.name
    ) as type
    FROM pokemons p
    LEFT JOIN pokemon_type pt ON p.id = pt.id_pokemon
    LEFT JOIN types t ON t.id = pt.id_type
    ${query ? "WHERE p.name LIKE $1" : ""}
    GROUP BY p.id;
  `,
    arr && arr
  );
}

function findPokemonByName(
  pokemonName: string
): Promise<QueryResult<PokemonBody>> {
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

function findPokemonById(
  pokemonId: number
): Promise<QueryResult<PokemonWithType>> {
  return connection.query(
    `
    SELECT p.id, p.name, p.weight,
    json_agg(
      json_build_object(
        'id', t.id,
        'name', t.name
      )
    ) as type
    FROM pokemons p
    LEFT JOIN pokemon_type pt ON p.id = pt.id_pokemon
    LEFT JOIN types t ON t.id = pt.id_type
    WHERE p.id = $1
    GROUP BY p.id;
  `,
    [pokemonId]
  );
}

function findPokemonsAndTypes(): Promise<QueryResult<PokemonWithType>> {
  return connection.query(`
  SELECT p.id, p.name, p.weight,
    json_agg(
      json_build_object(
        'id', t.id,
        'name', t.name
      )
    ) as type
    FROM pokemons p
    LEFT JOIN pokemon_type pt ON p.id = pt.id_pokemon
    LEFT JOIN types t ON t.id = pt.id_type
    GROUP BY p.id;
  `);
}

function deletePokemonById(pokemonId: number) {
  return connection.query(
    `
    DELETE FROM pokemons
    WHERE id = $1;
  `,
    [pokemonId]
  );
}

export const pokemonRepository = {
  insertOne,
  updatePokemon,
  insertPokemon_type,
  deletePokemon_type,
  findPokemonsWithTypes,
  findPokemonByName,
  findPokemonById,
  findPokemonsAndTypes,
  deletePokemonById,
};
