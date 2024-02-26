import { useEffect, useState } from 'react';
import { EntityService } from '@services/apiService/entityService.ts';
import { EntityLocation } from '@customTypes//location.ts';
import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';
import { AxiosError } from 'axios';
import { useLocations } from '@hooks/useLocations/useLocations.ts';

interface UseEntitiesParams {
  onCompleted?: () => void;
  onError?: (err: AxiosError) => void;
  onSuccess?: (data: EntityWithLocation[]) => void;
}

export function useEntities(options?: UseEntitiesParams) {
  const entityService = new EntityService();
  const { locations } = useLocations();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [entities, setEntities] = useState<EntityWithLocation[] | null>(null);

  async function getEntities(locationEntries: EntityLocation[]): Promise<EntityWithLocation[]> {
    const entitiesList: EntityWithLocation[] = [];

    for (const location of locationEntries) {
      await entityService
        .get(location.id)
        .then((entity) => {
          const entityWithLocation = { ...entity } as EntityWithLocation;
          entityWithLocation.lat = location.lat;
          entityWithLocation.lng = location.long;
          entitiesList.push(entityWithLocation);
        })
        .catch((err: AxiosError) => {
          throw err;
        });
    }
    return entitiesList;
  }

  function handleOnSuccess(d: EntityWithLocation[]) {
    setEntities(d);
    if (options?.onSuccess) {
      options?.onSuccess(d);
    }
  }

  function handleOnError(err: AxiosError) {
    setError(() => err);
    if (options?.onError) {
      options?.onError(err);
    }
  }

  function handleOnCompleted() {
    setLoading(() => false);
    if (options?.onCompleted) {
      options?.onCompleted();
    }
  }

  useEffect(() => {
    if (!locations) {
      setError(new AxiosError('No locations'));
      return;
    }

    setError(() => null);
    setLoading(() => true);
    void getEntities(locations)
      .then((d) => {
        handleOnSuccess(d);
      })
      .catch((err: AxiosError) => {
        handleOnError(err);
      })
      .finally(() => {
        handleOnCompleted();
      });
  }, [locations]);

  return { entities, loading, error };
}
