import {MapContainer, Marker, TileLayer, useMap, useMapEvents} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {useLocations} from "../../hooks/useLocations/useLocations.ts";
import {useEffect, useMemo, useState} from "react";
import {LatLng, LeafletMouseEvent} from "leaflet";
import {useEntities} from "../../hooks/useEntities/useEntities.ts";
import {MAP_CONFIG} from "../../config.ts";
import {useMapStore} from "../../stores/mapStore.ts";
import {EntityWithLocation} from "../../types/entityWithLocation.ts";
import RebelIcon from "../../assets/icons/starwars-rebel.svg"
import {EntityLocation} from "../../types/location.ts";
import Typewriter from 'typewriter-effect';
import {useEntityStore} from "../../stores/entityStore.ts";

export function EntityCard({entity, distance, onClick, selected}: {entity: EntityWithLocation, distance: number, onClick: (e: any) => void, selected: boolean}) {

    const selectedStyles = selected ? "shadow-[0px_0px_25px_rgb(34,178,79,0.5)] scale-105 "  : ""

    return (
        <Card
            selected={selected}
            onClick={onClick}
            image={entity.image}
            className={`bg-[#1f74c12b] border-[1px] border-opacity-10 rounded-l shadow-lg w-72 sm:w-64 md:w-96 lg:w-64 border-2 border-blue-100 cursor-pointer hover:scale-105 transition-all scroll-snap-align-center ${selectedStyles}`}
            details={[
                <dl key={entity.id} className={"p-4"}>
                    <dd className={"text-xl text-amber-100"}>{entity.name}</dd>
                    <dd className={"text-amber-50"}>{entity.species}</dd>
                    <dd className={"text-amber-50"}>{distance} km</dd>
                </dl>
            ]}
        />
    )
}

export function Card({image, details, className, onClick, selected}: {image: string, details: JSX.Element[], className: string, onClick?: (e?: any) => void, selected: boolean }) {

    return (
        <div onClick={onClick} className={className}>
            <div className={"w-full h-52"}>
                <img loading={"lazy"} src={image} className={"object-contain h-full w-full"}/>
            </div>
            <div>
                {details}
            </div>
        </div>
    )
}

export function MapInstanceController() {
    const {setMap} = useMapStore()
    const map = useMap()

    useEffect(() => {
        setMap(map)
    }, [map]);

    return null
}

export function LocatorMap() {
    function handleOnClickMarker(id: number) {
        console.log(id)
    }
    return (
        <div id={"map"}>
            <MapContainer
                className={"h-96 sm:h-[60vh] w-full"}
                center={MAP_CONFIG.center}
                scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
                zoom={MAP_CONFIG.zoom}
            >
                <MapInstanceController />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <EntityMarkers onClick={handleOnClickMarker}/>
                <UserLocationMarker/>
            </MapContainer>
        </div>
    )
}

export function UserLocationMarker() {
    const {setUserLocation} = useMapStore()
    const [position, setPosition] = useState<LatLng | null>(null)

    function handleSetPosition(e: LeafletMouseEvent) {
        const {lat, lng} = e.latlng
        setPosition(e.latlng)
        setUserLocation({lat, lng})
    }
    useMapEvents({
        click(e) {
            handleSetPosition(e)
        },
    })

    return position === null ? null : (
        <Marker position={position}>
        </Marker>
    )
}

export function EntityMarkers({onClick}: { onClick: (id: number) => void }) {
    const map = useMap()
    const {locations} = useLocations()

    function handleOnClick(loc: EntityLocation) {
        map.flyTo([loc.lat, loc.long], map.getZoom(), {
            easeLinearity: 200
        })
    }

    const markers = useMemo(() => {
        if (!locations) return []
        return locations.map(loc => {
            return (
                <Marker
                    eventHandlers={{
                        click: () => handleOnClick(loc),
                    }}
                    key={loc.id}
                    position={[loc.lat, loc.long]}>
                </Marker>
            )
        })
    }, [locations])

    if(!locations) return <></>

    return <>{markers}</>

}


export function EntityList() {
    const {userLocation, map} = useMapStore()
    const {setEntity, currentEntity} = useEntityStore()
    const {entities, loading, error} = useEntities()


    function calculateDistance({fromLocation, toLocation} : {fromLocation: [number, number], toLocation: [number, number]}) {
        if(!fromLocation || !toLocation) return 0
        let distance = map!.distance(fromLocation, toLocation)
        distance = Number((distance/1000).toFixed(1))
        return distance
    }

    function sortByNearest(a: EntityWithLocation, b: EntityWithLocation) {
        const aDistance = calculateDistance({fromLocation: userLocation!, toLocation: [a.lat, a.lng]})
        const bDistance = calculateDistance({fromLocation: userLocation!, toLocation: [b.lat, b.lng]})
        return aDistance - bDistance
    }

    function handleOnClick(e: EntityWithLocation) {
        if(!map) return
        map.flyTo([e.lat, e.lng], 12)
        setEntity(e)
    }

    const entitiesList = useMemo(() => {
        if(!entities) return []
        return entities
            .sort(
                (a,b) => sortByNearest(a, b)
            )
            .map(e => {
                return (
                    <EntityCard
                        selected={e.id === currentEntity?.id}
                        onClick={() => handleOnClick(e)}
                        key={e.id}
                        entity={e}
                        distance={calculateDistance({fromLocation: userLocation!, toLocation: [e.lat, e.lng]})} />
                )
            })
    }, [entities, map, userLocation, currentEntity])


    return <div className={"grid grid-flow-row grid-flow-col grid-rows-1 gap-2 sm:overflow-x-scroll overflow-y-scroll scroll-smooth h-full p-4 w-full scroll-type-x-mandatory"}>{entitiesList}</div>
}

export function Header() {

    return (
        <header className={"h-24 flex items-center justify-start header"}>
            <img src={RebelIcon} className={"h-28 w-28"} />
            <h1 className={"text-amber-50 text-2xl"}>Rebel Locator App</h1>
        </header>
    )
}

export function Dashboard() {
    const {userLocation} = useMapStore()

    return (
        <div className={"header h-96"}>
            {userLocation && (
                <EntityList/>
            )}
        </div>
    )


}

export function Instructions() {
    const {userLocation} = useMapStore()

    if(userLocation) return <></>

    return (
        <div className={"flex justify-center items-center absolute top-[7rem] w-full h-40"}>
            <div className={"header w-96 h-auto z-[999] rounded-2xl text-amber-50 text-sm p-4 text-center"}>
                <Typewriter
                    options={{
                        delay: 35,
                        strings: ['Click on a position on the map to reveal detailed information'],
                        autoStart: true,
                        loop: false,
                        deleteSpeed: 9999999999999
                    }}
                />
            </div>
        </div>
    )
}
export function Home() {

    return (
        <>
        <Header />
        <main>
            <Instructions />
            <LocatorMap/>
            <Dashboard />
        </main>
        </>
    )
}