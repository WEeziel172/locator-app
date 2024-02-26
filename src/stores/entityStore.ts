import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { EntityWithLocation } from '@customTypes/entityWithLocation.ts';

interface EntityStoreState {
  currentEntity: EntityWithLocation | null;
  setEntity: (e: EntityWithLocation) => void;
  entities: EntityWithLocation[] | null;
  setEntities: (entities: EntityWithLocation[]) => void;
}

export const useEntityStore = create<EntityStoreState>()(
  devtools(
    (set) => {
      return {
        currentEntity: null,
        entities: null,
        setEntity: (e: EntityWithLocation) =>
          set(() => {
            return {
              currentEntity: e,
            };
          }),
        setEntities: (e: EntityWithLocation[]) =>
          set(() => {
            return {
              entities: e,
            };
          }),
      };
    },
    {
      name: 'entity-storage',
    },
  ),
);
