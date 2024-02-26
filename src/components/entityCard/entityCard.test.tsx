import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';
import { EntityCard } from '@components/entityCard/entityCard.tsx';

describe('Entity card', () => {
  it('renders card with entity details', () => {
    const entityWithLocation: EntityWithLocation = {
      lat: 0,
      lng: 0,
      id: 0,
      name: 'Test walker',
      height: 0,
      mass: 0,
      gender: 'gender',
      homeworld: 'homeworld',
      wiki: '',
      image: '',
      born: 0,
      died: 0,
      diedLocation: '',
      species: 'species',
      hairColor: '',
      eyeColor: '',
      skinColor: '',
      cybernetics: '',
      affiliations: [],
      masters: [],
      apprentices: [],
      formerAffiliations: [],
    };
    const { getByTestId } = render(
      <EntityCard
        entity={entityWithLocation}
        distance={100}
        onClick={function (e: MouseEvent): void {
          throw new Error('Function not implemented.');
        }}
        selected={false}
      />,
    );
    const card = getByTestId('card');
    const descriptionList = getByTestId('description-list');
    const descriptionItem = getByTestId('description-item');

    expect(screen.getByTestId('card')).toBeDefined();
    expect(screen.getByTestId('description-list')).toBeDefined();
    expect(screen.getByTestId('description-item')).toBeDefined();

    expect(screen.getByText(entityWithLocation.name)).toBeDefined();

    expect(card).toContainElement(descriptionList);
    expect(descriptionList).toContainElement(descriptionItem);
  });
});
