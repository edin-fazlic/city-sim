import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface BuildingType {
  id: string;
  name: string;
  cost: number;
  space: number;
  population: number;
  income: number;
  happiness: number;
  limit?: number; // optional limit for some building types
}

const BUILDINGS: BuildingType[] = [
  {id: 'house', name: 'House', cost: 100, space: 1, population: 3, income: 0, happiness: 0},
  {id: 'apartment', name: 'Apartment', cost: 200, space: 2, population: 10, income: 0, happiness: -5},
  {id: 'factory', name: 'Factory', cost: 300, space: 2, population: 0, income: 10, happiness: -10, limit: 3},
  {id: 'office', name: 'Office', cost: 250, space: 1, population: 0, income: 5, happiness: 0},
  {id: 'park', name: 'Park', cost: 150, space: 1, population: 0, income: 0, happiness: 10, limit: 2}
];

@Injectable({providedIn: 'root'})
export class BuildingService {
  getAvailableBuildings(): Observable<BuildingType[]> {
    return of(BUILDINGS);
  }
}
