import { useEffect, useState } from 'react';
import { EntityLocation } from '@customTypes/location.ts';
import { AxiosError } from 'axios';
import SecretService from '@services/secretService/secretService.ts';

export function useLocations() {
  const [locations, setLocations] = useState<EntityLocation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const secretService = new SecretService();

  useEffect(() => {
    try {
      setLoading(() => true);
      void secretService.exposeSecretLocations().then((secretLocations) => {
        setLocations(secretLocations);
      });
    } catch (err) {
      setError(() => err as AxiosError);
    } finally {
      setLoading(() => false);
    }

    return () => setLocations(null);
  }, []);

  return { locations, loading, error };
}
