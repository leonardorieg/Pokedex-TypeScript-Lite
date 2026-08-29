export interface Pokemon {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;
    hp: number;
    ataque: number;
    defesa: number;
}

export interface PokemonResumo {
    id: number;
    nome: string;
    tipos: string[];
    altura: number;
    peso: number;
}

export interface PokemonApiResponse {
    id: number;
    species: {
        name: string;
    }
    height: number;
    weight: number;
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
}

export class PokemonModel implements Pokemon {
    constructor(
        public id: number,
        public nome: string,
        public tipos: string[],
        public altura: number,
        public peso: number,
        public hp: number,
        public ataque: number,
        public defesa: number,
    ) { }

}
