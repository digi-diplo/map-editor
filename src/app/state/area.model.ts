import { Region } from '../models/Region';
import { ID } from '@datorama/akita';

export enum AreaType {
  Empty = 'Empty',
  Arsenal = 'Arsenal',
  Factory = 'Factory'
}

export enum TerrainType {
  Ground = 'Ground',
  Water = 'Water'
}

export interface Area {
  id: ID;
  regions: Region[];
  name: string;
  type: AreaType;
  terrain: TerrainType;
}

/**
 * A factory function that creates Areas
 * @param params
 */
export function createArea({
  id = Math.random(),
  name = 'New area',
  regions = [],
  terrain = TerrainType.Ground,
  type = AreaType.Empty
}: Partial<Area>) {
  return {
    id,
    name,
    regions,
    terrain,
    type
  } as Area;
}
