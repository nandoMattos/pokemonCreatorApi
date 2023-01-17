import {Request, Response} from "express"

export async function getChampions (req : Request, res : Response) { 
  res.send('oi')
}