import { PokemonApiResponse, PokemonResumo } from "../models/pokemon.js";

export class PokemonApiService {

    async buscaPokemon(idOuNome: string): Promise<PokemonResumo | null> {

        const url: string = 'https://pokeapi.co/api/v2/pokemon/';
        const response = await fetch(`${url}${idOuNome}`);

        if (response.ok === false) {
            throw new Error('[ERRO] - Pokemon não encontrado: pokemon-inexistente');
        }

        const dados: PokemonApiResponse = await response.json();

        const PokemonResumo: PokemonResumo = {
            id: dados.id,
            nome: dados.species.name,
            tipos: dados.types.map(tipo => tipo.type.name),
            altura: dados.height,
            peso: dados.weight
        }
        return PokemonResumo
    }
}