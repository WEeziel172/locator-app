import { Entity } from './entity.ts';

export interface EntityWithLocation extends Entity {
  lat: number;
  lng: number;
}
