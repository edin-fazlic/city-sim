import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {BuildingType} from './building.service';

export interface ConstructedBuilding {
  id: number;
  type: BuildingType;
}

@Injectable({providedIn: 'root'})
export class CityService {
  private maxSpace = 20;
  private currentId = 1;

  private static readonly DEFAULT_STATUS = {
    spaceUsed: 0,
    population: 0,
    happiness: 50,
    money: 1000,
    limits: {} as Record<string, number>
  };

  private buildings: ConstructedBuilding[] = [];

  stats = CityService.DEFAULT_STATUS;

  getStats() {
    return {...this.stats};
  }

  constructBuilding(type: BuildingType): Observable<{ success: boolean; message?: string }> {
    const builtCount = this.stats.limits[type.id] || 0;

    if (type.limit && builtCount >= type.limit) {
      return throwError(() => ({status: 400, message: `${type.name} limit reached.`}));
    }

    if (this.stats.spaceUsed + type.space > this.maxSpace) {
      return throwError(() => ({status: 400, message: 'Not enough space.'}));
    }

    if (this.stats.money < type.cost) {
      return throwError(() => ({status: 400, message: 'Not enough money.'}));
    }

    this.stats.money -= type.cost;
    this.stats.spaceUsed += type.space;
    this.stats.population += type.population;
    this.stats.happiness = Math.max(0, Math.min(100, this.stats.happiness + type.happiness));
    this.stats.limits[type.id] = builtCount + 1;

    this.buildings.push({id: this.currentId++, type});

    return of({success: true});
  }


  reset(): void {
    this.buildings = [];
    this.stats = CityService.DEFAULT_STATUS;
    this.currentId = 1;
  }
}
