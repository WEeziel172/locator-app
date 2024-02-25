import { ROUTES } from '../../constants.ts';
import { Entity } from '../../types/entity.ts';
import axios from 'axios';

export class EntityService {
  async get(id: number): Promise<Entity> {
    return axios.get(ROUTES.ENTITY(id)).then((d) => d.data);
  }
}
