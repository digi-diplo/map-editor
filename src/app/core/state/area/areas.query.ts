import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { AreasStore, AreasState } from './areas.store';
import { Area } from './area.model';

@Injectable({
  providedIn: 'root'
})
export class AreasQuery extends QueryEntity<AreasState, Area> {
  constructor(protected store: AreasStore) {
    super(store);
  }
}
