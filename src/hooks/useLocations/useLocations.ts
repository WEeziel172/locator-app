import { useEffect, useState } from 'react';
import { EntityLocation } from '@customTypes/location.ts';
import { AxiosError } from 'axios';
import SecretService from '@services/secretService/secretService.ts';

export function useLocations() {
  const [locations, setLocations] = useState<EntityLocation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const secretService = new SecretService();

  function handleOnSuccess(secretLocations: EntityLocation[]) {
    setLocations(secretLocations);
  }

  function handleOnError(err: AxiosError) {
    setError(err);
  }

  function handleOnCompleted() {
    setLoading(false);
  }

  useEffect(() => {
    setError(() => null);
    setLoading(true);
    void secretService
      .exposeSecretLocations()
      .then((secretLocations) => {
        handleOnSuccess(secretLocations);
      })
      .catch((err: AxiosError) => {
        handleOnError(err);
      })
      .finally(() => {
        handleOnCompleted();
      });
    return () => setLocations(null);
  }, []);

  return { locations, loading, error };
}
