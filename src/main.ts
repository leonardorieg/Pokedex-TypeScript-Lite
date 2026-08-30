import { PokemonApiService } from "./services/pokemonApiService.js";
import { BoxServices } from "./services/boxService.js";
import { PokemonResumo } from "./models/pokemon.js";

 // ! teste de funções 
// Consultas na API
const teste: PokemonResumo | null = await PokemonApiService.buscaPokemon('25');
const teste1: PokemonResumo | null = await PokemonApiService.buscaPokemon('charmander');
const teste2: PokemonResumo | null = await PokemonApiService.buscaPokemon('Charizard');
const teste3: PokemonResumo | null = await PokemonApiService.buscaPokemon('Bulbasaur');

const boxService = new BoxServices();

// Adicionar
await boxService.adicionar(teste);
await boxService.adicionar(teste1);
await boxService.adicionar(teste2);
await boxService.adicionar(teste3);

// Busca catalogo interno
let catalogo: PokemonResumo[] = await boxService.buscarTodos();
console.table(catalogo);

// Busca por ID
const pokemon = await boxService.buscarPorId(25);
console.log(pokemon);

// Remoção de item do catalogo
await boxService.remover(25);

// Validando remoção
catalogo = await boxService.buscarTodos();
console.table(catalogo);