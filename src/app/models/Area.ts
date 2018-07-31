import { Region } from './Region';

export enum AreaType {
  None,
  Arsenal,
  Factory
}

export enum TerrainType {
  Ground,
  Water
}

export interface Area {
  regions: Region[];
  name: string;
  type: AreaType;
  terrain: TerrainType;
}
