import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { useLocations } from './useLocations.ts';
import { describe } from 'vitest';
import { server } from '../../tests/setup.ts';
import { http, HttpResponse } from 'msw';
import { ROUTES } from '@constants';
import { AxiosError } from 'axios';
import { EntityLocation } from '@customTypes/location.ts';

describe('useLocation hook', () => {
  test('Should return locations', async () => {
    let hook: RenderHookResult<
      {
        loading: boolean;
        error: AxiosError | null;
        locations: EntityLocation[] | null;
      },
      null
    >;

    await act(async () => {
      return new Promise((resolve) => {
        hook = renderHook(() => useLocations());
        resolve();
      });
    });

    // @ts-expect-error ignore
    const { result } = hook;

    expect(result.current.locations).toBeDefined();
  });

  test('Should return error', async () => {
    server.use(
      http.get(ROUTES.SECRET, () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    let hook: RenderHookResult<
      {
        loading: boolean;
        error: AxiosError | null;
        locations: EntityLocation[] | null;
      },
      null
    >;

    await act(async () => {
      return new Promise((resolve) => {
        hook = renderHook(() => useLocations());
        resolve();
      });
    });

    // @ts-expect-error ignore
    const { result } = hook;

    expect(result.current.error).toBeDefined();
    expect(result.current.locations).toBeNull();
  });
});
