import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
// import { POKEMONS } from './mock-pockemon-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(
    private http: HttpClient
  ) {

  }
  getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => this.log(pokemonList)),
      catchError((error) => this.handelError(error, []))
    );
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    // return POKEMONS.find(pokemon => pokemon.id == pokemonId);
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handelError(error, undefined))
    );
  }

  updatePokemon(pokemon: Pokemon):Observable<null> {
    const httpOptions =  {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handelError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon):Observable<Pokemon> {
    const httpOptions =  {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handelError(error, null))
    );
  }


  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handelError(error, null))
    );
  }

  searchPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length <= 1) {
      return of([]);
    }
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handelError(error,  []))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handelError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Fée',
      'Combat',
      'Poison',
      'Vol',
      'Psy'
    ];
  }
}
