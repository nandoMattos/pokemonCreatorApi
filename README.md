# pokemonCreatorApi

Hi there! This is a simple CRUD API developed to practive a few TypeScript concepts.

## About 

PokemonCreator is an API to create Pokemons with its respective type(s). Soon you will be able to insert weaknesses to every type 
and "calculate" which pokemon is waeak/strong against other types.

## How to run for development

1. Clone this repository
2. Install all dependencies:
```bash
npm i
```
3. Create a PostgresSQL database with whatever name you want
4. Import `dump.sql` file:
```bash
psql -h HOST_NAME -d YOUR_DATABASE -U USERNAME -f dump.sql
```

5. Create and configure your `.env` file using the `.env.example` file
6. If you want, you can import my thunder-client collection that I used for test features using the `thunder-client_pokemon.json` file
- For more infomations of how to import a thunder-client collection, access: https://github.com/rangav/thunder-client-support#importexport

## API Documentation:

With PokemonCreator, you can manage your Pokemons inserting their name, weight and types. You can add acctually existent ones or create your owns.

### Ruotes:
### `POST /pokemons` <br/> 
requires a body:
```js
{
  name: "Bulbasaur"
  weight: 6.9,
  type: ["Grass", "Poison"]
}
```
