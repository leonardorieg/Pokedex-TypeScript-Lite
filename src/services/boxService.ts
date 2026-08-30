import { readFile, writeFile } from "node:fs/promises";
import { PokemonResumo } from "../models/pokemon.js";

export class BoxServices {
    private caminhoArquivo: string = './pc_box.json';

    async adicionar(pokemon: PokemonResumo | null): Promise<void> {
        if (pokemon === null) {
            console.log("[ERRO] - Pokemon Nulo");
            return
        }
        const pokemons: PokemonResumo[] = await this.buscarTodos();

        const duplicado: boolean = pokemons.some((item) => {
            return item.id === pokemon.id;
        });

        if (duplicado) {
            console.log("[ERRO] - Pokemon já existente");
            return;
        }

        pokemons.push(pokemon);

        await writeFile(
            this.caminhoArquivo,
            JSON.stringify(pokemons, null, 2),
            "utf-8"
        );

        console.log("[OK] - Pokemon adicionado");
    }
    async buscarTodos(): Promise<PokemonResumo[]> {

        const dados = await readFile(
            this.caminhoArquivo,
            "utf-8"
        );

        return JSON.parse(dados);
    }

    async buscarPorId(id: number | null): Promise<PokemonResumo | undefined> {
        if (id === null) {
            console.log("[ERRO] - ID Nulo");
            return
        }
        const pokemons: PokemonResumo[] = await this.buscarTodos();

        return pokemons.find((pokemon) => {
           return pokemon.id === id
        });
    }
    async remover(id: number | null): Promise<void> {
        if (id === null) {
            console.log("[ERRO] - ID Nulo");
            return
        }

        let pokemons: PokemonResumo[] = await this.buscarTodos();

        const existe = pokemons.some(pokemon => {
            return pokemon.id !== id;
        })

        if (!existe) {
            console.log('[AVISO] - Pokemon não encontrado')
            return;
        }

        pokemons = pokemons.filter(pokemon => {
            return pokemon.id !== id;
        });
        await writeFile(
            this.caminhoArquivo,
            JSON.stringify(pokemons, null, 2),
            "utf-8"
        );
        console.log('[OK] - Pokemon removido');
    }
} 