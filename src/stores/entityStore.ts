import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {EntityWithLocation} from "../types/entityWithLocation.ts";

interface EntityStoreState {
    currentEntity: EntityWithLocation | null
    setEntity: (e: EntityWithLocation) => void
}

export const useEntityStore = create<EntityStoreState>()(
    devtools(
        (set) => ({
            currentEntity: null,
            setEntity: (e: EntityWithLocation) => set(() => {
                return ({
                    currentEntity: e
                });
            })
        }),
        {
            name: 'entity-storage',
        },
    ),
)