import { useState, useRef } from 'react';
import Marker from 'react-native-maps';
import MapView from "react-native-maps";


export default function TrackMarkerMap(props: { lat: string, long: string }) {

    const [mapReady, setMapReady] = useState<boolean>(false)
    const mapRef = useRef(null);
    
    function animateToMarker(){
        setMapReady(true)
        setTimeout(() => {
            if (mapRef.current) mapRef.current.animateToRegion({
                latitude: Number(props.lat),
                longitude: Number(props.long),
                latitudeDelta: .01,
                longitudeDelta: .01,
              }, 3000)
        }, 500);
        
    }

    return (
        <MapView
        style={{width: "100%", height: 200 }}
        ref={mapRef}
        initialRegion={{
          latitude: 52.0786,
          longitude: -1.01694,
          latitudeDelta: .01,
        longitudeDelta: .01,
        }}        
        onMapReady={animateToMarker} />
    )
}