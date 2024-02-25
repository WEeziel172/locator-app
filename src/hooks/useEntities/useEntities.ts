import { useLocations } from '../useLocations/useLocations.ts';
import { useMemo, useState } from 'react';
import { EntityService } from '../../services/apiService/entityService.ts';
import { EntityLocation } from '../../types/location.ts';
import { EntityWithLocation } from '../../types/entityWithLocation.ts';
import { AxiosError } from 'axios';

export function useEntities() {
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

  useMemo(() => {
    if (!locations) return;
    try {
      setLoading(true);
      getEntities(locations).then((d) => {
        setEntities(d!);
      });
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [locations]);

  return { entities, loading, error };
}
