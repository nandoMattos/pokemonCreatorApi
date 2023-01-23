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
6. Run dev script:
```bash
npm run dev
```
7. If you want, you can import my thunder-client collection that I used for test features using the `thunder-client_pokemon.json` file
- For more infomations of how to import a thunder-client collection, access: https://github.com/rangav/thunder-client-support#importexport

## API Documentation:

With PokemonCreator, you can manage your Pokemons inserting their name, weight and types. You can add acctually existent ones or create your owns. <br/>
OBS: A pokemon can have a max of 2 types

### Ruotes:

### `POST /pokemons` <br/> 
requires a body in the format:
```js
{
  name: "Bulbasaur"
  weight: 6.9,
  type: ["Grass", "Poison"]
}
```

### `GET /pokemons/?name=pokemonName` <br/>
- accepts a query to filter pokemon name 
- returns an array in the format:
```js
[
  {
    "id": 66,
    "name": "Squirtle",
    "weight": 9,
    "type": [
      "Water"
    ]
  },
  {
    "id": 67,
    "name": "Polywrath",
    "weight": 54,
    "type": [
      "Water",
      "Fighting"
    ]
  }
]
```

### `GET /types/?name=pokemonType` <br/>
- accepts a query to filter type name 
- returns an array in the format:
```js
[
  {
    "id": 49,
    "name": "Grass"
  },
  {
    "id": 50,
    "name": "Poison"
  },
  {
    "id": 51,
    "name": "Fire"
  }
]
```

### `GET /pokemons/types/:typeId` <br/>
- returns all pokemons with correspondent id type
-  ex: Fire(id:51): 
```js
[
  {
    "id": 60,
    "name": "Charmander",
    "weight": 8.5,
    "type": [
      "Fire"
    ]
  },
  {
    "id": 61,
    "name": "Charizard",
    "weight": 90.5,
    "type": [
      "Fire",
      "Flying"
    ]
  }
]
```

### `PUT /pokemons/:id` <br/>
- updates the Pokemon name and/or weight with correspondent id
- requires a body in the format:
```js
{
  "name": "Charizard",
  "weight": 90.5
}
```

### `DELETE /pokemons/:id` <br/>
- deletes Pokemon with correspondent id

















