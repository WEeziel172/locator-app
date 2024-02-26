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

  async function getEntities(locationEntries: EntityLocation[]) {
    const entitiesList: EntityWithLocation[] = [];
    for (const location of locationEntries) {
      try {
        const entity = (await entityService.get(location.id)) as EntityWithLocation;
        entity.lat = location.lat;
        entity.lng = location.long;
        entitiesList.push(entity);
      } catch {
        return;
      }
    }
    return entitiesList;
  }

  useEffect(() => {
    if (!locations) return;
    try {
      setLoading(true);
      getEntities(locations).then((d) => {
        setEntities(d!);
        if (options?.onSuccess) {
          options?.onSuccess(d!);
        }
      });
    } catch (err) {
      setError(err as AxiosError);
      if (options?.onError) {
        options?.onError(err as AxiosError);
      }
    } finally {
      setLoading(false);
      if (options?.onCompleted) {
        options?.onCompleted();
      }
    }
  }, [locations]);

  return { entities, loading, error };
}
