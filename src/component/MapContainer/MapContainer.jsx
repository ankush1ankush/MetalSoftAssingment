

import React from 'react'
import { useSelector } from 'react-redux'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import "./MapContainer.css"
function MapContainer() {
    const center = useSelector((state) => {
        return { lat: state.coordinateStore.lat, lng: state.coordinateStore.lng }
    })

    return (
        <div className="mapContainer">
            <GoogleMap center={center} zoom={10} mapContainerStyle={{ width: '100%', height: '100%' }} options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}>
                <MarkerF position={center} />
            </GoogleMap>
        </div>
    )
}

export default MapContainer