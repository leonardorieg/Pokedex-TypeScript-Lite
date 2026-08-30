import {
    createInterface,
    Interface
} from "node:readline/promises";

import {
    stdin as input,
    stdout as output
} from "node:process";

import { BoxServices } from "../services/boxService.js";
import { PokemonApiService } from "../services/pokemonApiService.js";
import { PokemonResumo } from "../models/pokemon.js";

export class TerminalController {

    constructor(
        private pokemonApiService: PokemonApiService,
        private boxService: BoxServices
    ) { }

    async executar(): Promise<void> {

        const rl = createInterface({
            input,
            output
        });

        let opcao: string;
        let res;

        do {

            console.log("\nPOKÉDEX TYPESCRIPT LITE");
            console.log("----------------------");
            console.log("1 - Buscar Pokémon");
            console.log("2 - Adicionar Pokémon ao catálogo");
            console.log("3 - Remover Pokémon do catálogo");
            console.log("4 - Listar catálogo");
            console.log("0 - Sair");

            opcao = await rl.question(
                "\nEscolha uma opção: "
            );

            switch (opcao) {

                case "1":
                    try {
                        res = await this.buscaNaApi(rl);
                        if (res !== null) {
                            console.log(res);
                        }
                    } catch (erro) {
                        console.log(erro);
                    }
                    break;

                case "2":
                    try {
                        res = await this.adicionar(rl);
                        console.log(res);
                    } catch (erro) {
                        console.log(erro);
                    }
                    break;


                case "3":
                    try {
                        await this.remover(rl);
                    } catch (erro) {
                        console.log(erro);
                    }
                    break;

                case "4":
                    try {
                        res = await this.listar();
                        console.table(res);
                    } catch (erro) {
                        console.log(erro);
                    }
                    break;

                case "0":
                    console.log("Saindo...");
                    break;

                default:
                    console.log("[ERRO] - Opção inválida");
            }

        } while (opcao !== "0");

        rl.close();
    }

    private async buscaNaApi(rl: Interface): Promise<PokemonResumo | null> {

        const pokemonNome = await rl.question("\nDigite o nome do Pokémon: ");

        return await this.pokemonApiService.buscaPokemon(pokemonNome);
    }
    private async adicionar(rl: Interface) {

        const pokemon = await this.buscaNaApi(rl);

        return this.boxService.adicionar(pokemon);
    }
    private async listar() {
        return this.boxService.buscarTodos();
    }
    private async remover(rl: Interface) {

        const entrada = await rl.question("\n Digite o pokemon que deseja remover:");

        const idOuNome =
            /^\d+$/.test(entrada)
                ? Number(entrada)
                : entrada;

        return await this.boxService.remover(idOuNome);
    }

}