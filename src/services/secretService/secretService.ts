import axios, { AxiosResponse } from 'axios';
import { ROUTES } from '@constants';
import { EntityLocation } from '@customTypes/location.ts';

export default class SecretService {
  // 007

  async exposeSecretLocations(): Promise<EntityLocation[]> {
    return axios.get(ROUTES.SECRET).then(
      (
        d: AxiosResponse<{
          message: string;
        }>,
      ) => JSON.parse(atob(d.data.message)) as Promise<EntityLocation[]>,
    );
  }
}
