import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { useEntities } from './useEntities.ts';
import { describe, it } from 'vitest';
import { entityRouteError, secretRouteError, secretRouteSuccess, server } from '../../tests/setup.ts';
import { AxiosError } from 'axios';
import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';

describe('useEntities hook', () => {
  it('Should return entities', async () => {
    let hook: RenderHookResult<
      {
        loading: boolean;
        error: AxiosError | null;
        entities: EntityWithLocation[] | null;
      },
      null
    >;

    await act(async () => {
      return new Promise((resolve) => {
        hook = renderHook(() => useEntities());
        resolve();
      });
    });

    // @ts-expect-error ignore
    const { result } = hook;

    expect(result.current.entities).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it('Should return error when locations fail', async () => {
    server.use(secretRouteError);

    let hook: RenderHookResult<
      {
        loading: boolean;
        error: AxiosError | null;
        entities: EntityWithLocation[] | null;
      },
      null
    >;

    await act(async () => {
      return new Promise((resolve) => {
        hook = renderHook(() => useEntities());
        resolve();
      });
    });

    // @ts-expect-error ignore
    const { result } = hook;

    expect(result.current.error).toBeDefined();
    expect(result.current.entities).toBeNull();
  });

  it('Should return error when entities fail', async () => {
    const mergedHandlers = [secretRouteSuccess, entityRouteError];

    server.use(...mergedHandlers);

    let hook: RenderHookResult<
      {
        loading: boolean;
        error: AxiosError | null;
        entities: EntityWithLocation[] | null;
      },
      null
    >;

    await act(async () => {
      return new Promise((resolve) => {
        hook = renderHook(() => useEntities());
        resolve();
      });
    });

    // @ts-expect-error ignore
    const { result } = hook;

    expect(result.current.error).toBeDefined();
    expect(result.current.entities).toBeNull();
  });
});
