import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { POKEMONS } from './pokemon/mock-pockemon-list';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService{

  createDb() {
    const pokemons = POKEMONS;
    return { pokemons };
  };
}
