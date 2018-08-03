import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';

import { Area } from './area.model';

export interface AreaState extends EntityState<Area>, ActiveState { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'areas' })
export class AreaStore extends EntityStore<AreaState, Area> {

  constructor() {
    super();
  }

}

