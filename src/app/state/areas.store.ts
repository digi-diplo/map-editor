import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';

import { Area } from './area.model';

export interface AreasState extends EntityState<Area>, ActiveState { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'areas' })
export class AreasStore extends EntityStore<AreasState, Area> {

  constructor() {
    super();
  }

}

