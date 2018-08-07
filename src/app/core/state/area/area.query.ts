import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { AreaStore, AreaState } from './area.store';
import { Area } from './area.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaQuery extends QueryEntity<AreaState, Area> {
  private _hasActive = false;

  constructor(protected store: AreaStore) {
    super(store);
    this.selectActive().subscribe(a => this._hasActive = a !== undefined);
  }

  hasActiveStream(): Observable<boolean> {
    return this.selectActive().pipe(
      map(a => a !== undefined)
    );
  }

  get hasActiveEntity(): boolean {
    return this._hasActive;
  }
}
