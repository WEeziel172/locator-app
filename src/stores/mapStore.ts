import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {Map as LeafletMap} from "leaflet";

interface MapStoreState {
    userLocation: [number, number] | null
    setUserLocation: ({lat, lng}: {lat: number, lng: number}) => void
    map: LeafletMap | null
    setMap: (mapObj: LeafletMap) => void
}

export const useMapStore = create<MapStoreState>()(
    devtools(
        (set) => ({
            userLocation: null,
            map: null,
            setUserLocation: ({lat, lng}) => set(() => ({userLocation: [lat, lng]})),
            setMap: (mapObj: LeafletMap) => set(() => ({map: mapObj}))
        }),
        {
            name: 'map-storage',
        },
    ),
)