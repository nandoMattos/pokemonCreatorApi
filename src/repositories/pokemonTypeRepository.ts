import { QueryResult } from "pg";
import connection from "../database/db.js";

function insertOne(typeName: string): Promise<QueryResult<any>> {
  return connection.query(
    `
    INSERT INTO types
    (name)
    VALUES
    ($1)
    RETURNING id
  `,
    [typeName]
  );
}

function findTypeByName(typeName: string): Promise<QueryResult> {
  return connection.query(
    `
    SELECT id
    FROM types
    WHERE name = $1
  `,
    [typeName]
  );
}

export const pokemonTypeRepository = {
  insertOne,
  findTypeByName,
};
