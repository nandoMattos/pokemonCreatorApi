import { Request, Response } from "express";
import { pokemonTypeRepository } from "../repositories/pokemonTypeRepository.js";

export async function getTypes(req: Request, res: Response) {
  let typeName: string;
  if (req.query && req.query.name) {
    typeName = (req.query as any).name;
  }

  const allTypes = await pokemonTypeRepository.findTypes(typeName);

  res.send(allTypes.rows);
}
