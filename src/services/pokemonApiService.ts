import { PokemonApiResponse, PokemonResumo } from "../models/pokemon.js";

export class PokemonApiService {

    static async buscaPokemon(idOuNome: string): Promise<PokemonResumo | null> {

        try {
            const url: string = 'https://pokeapi.co/api/v2/pokemon/';
            const response = await fetch(`${url}${idOuNome}`);

            if (!response.ok) {
                console.log('[ERRO] - Pokemon não encontrado');
                return null;
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
        } catch (erro) {
            console.log('[ERRO] - Não foi possivel consultar a PokeAPI');
            return null
        }
    }
}