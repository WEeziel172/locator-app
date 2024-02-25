import { ROUTES } from '@constants';
import { Entity } from '@customTypes/entity.ts';
import axios from 'axios';

export class EntityService {
  async get(id: number): Promise<Entity> {
    return axios.get(ROUTES.ENTITY(id)).then((d) => d.data);
  }
}
