import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { AreaStore, AreaState } from './area.store';
import { Area } from './area.model';

@Injectable({
  providedIn: 'root'
})
export class AreasQuery extends QueryEntity<AreaState, Area> {
  constructor(protected store: AreaStore) {
    super(store);
  }
}
