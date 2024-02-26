import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { ROUTES } from '@constants';
import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';

const secretMessage = {
  message:
    'WwogIHsKICAgICJpZCI6IDQsCiAgICAibGF0IjogLTMzLjg1NjY0MTgwNzIyNDgxLAogICAgImxvbmciOiAxNTEuMjE1MzM5NjExODc5MgogIH0sCiAgewogICAgImlkIjogOCwKICAgICJsYXQiOiAzNi4yMTQ5MDQ0NDI5MTExMSwKICAgICJsb25nIjogLTExMi4wOTY5OTg1Nzc2OTgwMgogIH0sCiAgewogICAgImlkIjogMTMsCiAgICAibGF0IjogNDAuNDUzMjM0NDY1MTAxOCwKICAgICJsb25nIjogLTMuNjg4Mzk4MDYxNDgwNTQ5NAogIH0sCiAgewogICAgImlkIjogMTUsCiAgICAibGF0IjogLTUzLjQwOTgyOTA5NzEzODk4LAogICAgImxvbmciOiAtNzAuNzcyMTQxMTYwNjc2NDQKICB9LAogIHsKICAgICJpZCI6IDE2LAogICAgImxhdCI6IDQ4Ljg2MDczMTA1MjY5NDU1LAogICAgImxvbmciOiAyLjMzNzYwMTA4OTM5OTU4OTMKICB9LAogIHsKICAgICJpZCI6IDIwLAogICAgImxhdCI6IDQxLjg5MDM1MzkyMTQ4MzA1LAogICAgImxvbmciOiAxMi40OTIyMjAxNzU3NDE3NDgKICB9LAogIHsKICAgICJpZCI6IDIxLAogICAgImxhdCI6IDUxLjE4MDQ5NjE3MDc4NzI1LAogICAgImxvbmciOiAtMS44MjY2NjYxOTg2MzM2NwogIH0sCiAgewogICAgImlkIjogMjIsCiAgICAibGF0IjogMjkuOTc5NDI2OTg0MTE5ODMzLAogICAgImxvbmciOiAzMS4xMzQxNzQ4NTg0MDc2MTUKICB9LAogIHsKICAgICJpZCI6IDI0LAogICAgImxhdCI6IDM3Ljk2OTUzNjc3NDI1Mzc3LAogICAgImxvbmciOiAyMy43MzM1MjkxNjI1NDAzNAogIH0sCiAgewogICAgImlkIjogMjcsCiAgICAibGF0IjogMzUuODgwNTc3NDg3MDc1OTgsCiAgICAibG9uZyI6IDc2LjUxNTE0MzA3Njg0NjMKICB9Cl0=',
};
const entityWithLocation: EntityWithLocation = {
  lat: 0,
  lng: 0,
  id: 0,
  name: '',
  height: 0,
  mass: 0,
  gender: '',
  homeworld: '',
  wiki: '',
  image: '',
  born: 0,
  died: 0,
  diedLocation: '',
  species: '',
  hairColor: '',
  eyeColor: '',
  skinColor: '',
  cybernetics: '',
  affiliations: [],
  masters: [],
  apprentices: [],
  formerAffiliations: [],
};
export const secretRouteSuccess = http.get(ROUTES.SECRET, () => {
  return HttpResponse.json(secretMessage);
});

export const secretRouteError = http.get(ROUTES.SECRET, () => {
  return new HttpResponse(null, {
    status: 500,
  });
});
export const entityRouteSuccess = http.get('https://akabab.github.io/starwars-api/api/id/*', () => {
  return HttpResponse.json(entityWithLocation);
});

export const entityRouteError = http.get('https://akabab.github.io/starwars-api/api/id/*', () => {
  return new HttpResponse(null, {
    status: 500,
  });
});
// ...
export const restHandlers = [secretRouteSuccess, entityRouteSuccess];

export const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
