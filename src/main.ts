import {TerminalController} from './controllers/terminalController.js';
import { BoxServices } from './services/boxService.js';
import { PokemonApiService } from './services/pokemonApiService.js';


const pokemonApiService = new PokemonApiService();

const boxService = new BoxServices();

const controller = new TerminalController(
    pokemonApiService,
    boxService
);

controller.executar();