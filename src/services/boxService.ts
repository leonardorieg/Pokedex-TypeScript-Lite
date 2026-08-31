import { readFile, writeFile } from "node:fs/promises";
import { PokemonResumo } from "../models/pokemon.js";

export class BoxServices {
    private caminhoArquivo: string = './pc_box.json';

    async adicionar(pokemon: PokemonResumo | null): Promise<PokemonResumo> {
        if (pokemon === null) {
            throw new Error("[ERRO] - Pokemon Nulo");
        }
        const pokemons: PokemonResumo[] = await this.buscarTodos();

        const duplicado: boolean = pokemons.some((item) => {
            return item.id === pokemon.id;
        });

        if (duplicado) {
            throw new Error("[ERRO] - Pokemon já existeno catálogo");
        }

        pokemons.push(pokemon);
        await writeFile(
            this.caminhoArquivo,
            JSON.stringify(pokemons, null, 2),
            "utf-8"
        );

        console.log("[OK] - Pokemon adicionado");
        return pokemon;
    }
    async buscarTodos(): Promise<PokemonResumo[]> {

        const dados = await readFile(
            this.caminhoArquivo,
            "utf-8"
        );
        
        return JSON.parse(dados);
    }

    async buscarPorIdOuNome(idOuNome: number | string | null): Promise<PokemonResumo | undefined> {
        if (idOuNome === null) {
            throw new Error("[ERRO] - Valor id e nome  Nulo");
        }
        const propriedade: keyof PokemonResumo = typeof idOuNome != 'number' ? 'nome' : 'id';
        
        if(typeof idOuNome === 'string'){
            idOuNome = idOuNome.trim().toLowerCase();
        }

        const pokemons: PokemonResumo[] = await this.buscarTodos();

        return pokemons.find((pokemon) => {
            return pokemon[propriedade] === idOuNome;
        });
    }


    async remover(idOuNome: number | string | null): Promise<void> {

        if (idOuNome === null) {
            throw new Error("[ERRO] - Valor nulo");
        }

        const pokemon = await this.buscarPorIdOuNome(idOuNome);

        if (!pokemon) {
            throw new Error("[AVISO] - Pokemon não encontrado");
        }

        let pokemons = await this.buscarTodos();

        pokemons = pokemons.filter(item => {
            return item.id !== pokemon.id;
        });

        await writeFile(
            this.caminhoArquivo,
            JSON.stringify(pokemons, null, 2),
            "utf-8"
        );

        console.log("[OK] - Pokemon removido");
    }
} 